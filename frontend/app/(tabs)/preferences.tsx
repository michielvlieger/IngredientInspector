import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ListRenderItemInfo, Animated, Dimensions, ListRenderItem } from 'react-native';
import CheckboxComponent from 'components/Checkbox';
import { allCategoriesWithIngredientsWithCheckboxes, enableOrDisableAllCategoryIngredients, updateCheckboxStatusOfIngredient } from '@hooks';
import HeaderComponent from 'components/Header';
import { CheckboxInterface } from '@interfaces';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 50;

interface CategoryWithIngredients {
  id: string;
  label: string;
  checked: boolean;
  value: CheckboxInterface[];
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<CategoryWithIngredients>);

const Preferences: React.FC = () => {
  const [items, setItems] = useState<CategoryWithIngredients[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const subscription = allCategoriesWithIngredientsWithCheckboxes().subscribe({
      next: (response) => {
        setItems(response);
      },
      error: (error) => console.error('Error loading preferences items', error)
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCategoryChange = (newValue: CheckboxInterface) => {
    enableOrDisableAllCategoryIngredients(newValue).subscribe({
      next: () => {
        setItems((prevItems) =>
          prevItems?.map(item =>
            item.id === newValue.id
              ? { ...item, checked: newValue.checked, value: item.value.map(v => ({ ...v, checked: newValue.checked })) }
              : item
          ) || null
        );
      },
      error: (error) => console.error(`Error updating category ${newValue.id}`, error)
    });
  };

  const handleIngredientChange = (newValue: CheckboxInterface) => {
    updateCheckboxStatusOfIngredient(newValue).subscribe({
      next: () => {
        setItems((prevItems) =>
          prevItems?.map(item =>
          ({
            ...item,
            value: item.value.map(v =>
              v.id === newValue.id ? { ...v, checked: newValue.checked } : v
            ),
            checked: item.value.some(v => v.checked || (v.id === newValue.id && newValue.checked))
          })
          ) || null
        );
      },
      error: (error) => console.error(`Error updating ingredient ${newValue.id}`, error)
    });
  };

  const filteredItems = items?.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.value.some(ingredient => ingredient?.label?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!items) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.centerText}>
          Aan het laden...
        </Text>
      </View>
    );
  }

  const renderCategory: ListRenderItem<CategoryWithIngredients> = ({ item }) => (
    <View style={[styles.categoryContainer, styles.backgroundWhite]}>
      <View style={[styles.row, styles.backgroundWhite]}>
        <CheckboxComponent
          key={item.id}
          id={item.id}
          label=""
          checked={item.checked}
          onValueChange={handleCategoryChange}
        />
        <Text style={styles.categoryHeader}>{item.label}</Text>
      </View>
      <View style={[styles.indented, styles.backgroundWhite]}>
        {item.value.map((ingredient) => (
          <CheckboxComponent
            key={ingredient.id}
            id={ingredient.id}
            label={ingredient.label}
            checked={ingredient.checked}
            onValueChange={handleIngredientChange}
          />
        ))}
      </View>
    </View>
  );

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, -HEADER_MAX_HEIGHT],
    extrapolate: 'clamp',
  });

  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 0 && showSearchBar) {
      Animated.timing(searchBarOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowSearchBar(false));
    }
  };

  const handleScrollEnd = () => {
    Animated.timing(searchBarOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setShowSearchBar(true));
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}>
        <HeaderComponent
          uri="https://i.imgur.com/yqWH29P.jpeg"
          isHeader={true}
        />
      </Animated.View>
      <AnimatedFlatList
        data={filteredItems}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: handleScroll,
          }
        )}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
      />
      <Animated.View style={[styles.minimizedSearchBarContainer, { opacity: searchBarOpacity }]}>
        <TextInput
          style={styles.minimizedSearchBar}
          placeholder="Zoek..."
          value={searchQuery}
          onFocus={() => setIsTyping(true)}
          onBlur={() => {
            if (searchQuery === '') {
              setIsTyping(false);
            }
          }}
          onChangeText={text => {
            setSearchQuery(text);
            if (text === '') {
              setIsTyping(false);
            } else {
              setIsTyping(true);
            }
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    zIndex: 1,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 24,
  },
  minimizedSearchBarContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    zIndex: 1,
  },
  minimizedSearchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: HEADER_MAX_HEIGHT + 12,
    paddingBottom: 80, // Adjusted padding to add more space at the bottom.
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indented: {
    marginLeft: 36,
  },
  backgroundWhite: {
    backgroundColor: '#fff',
    borderRadius: 8,
  }
});

export default Preferences;
