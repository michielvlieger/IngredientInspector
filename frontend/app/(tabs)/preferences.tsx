import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CheckboxComponent from 'components/Checkbox';
import { allCategoriesWithIngredientsWithCheckboxes, enableOrDisableAllCategoryIngredients, updateCheckboxStatusOfIngredient } from '@hooks';
import HeaderComponent from 'components/Header';
import { CheckboxInterface } from '@interfaces';

const Preferences: React.FC = () => {
  const [items, setItems] = useState<{ id: string; label: string; checked: boolean; value: CheckboxInterface[]; }[] | null>(null);

  useEffect(() => {
    const subscription = allCategoriesWithIngredientsWithCheckboxes().subscribe({
      next: (response) => {
        setItems(response);
        // console.log('Preferences items loaded successfully');
      },
      error: (error) => console.error('Error loading preferences items', error)
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCategoryChange = (newValue: CheckboxInterface) => {
    enableOrDisableAllCategoryIngredients(newValue).subscribe({
      next: () => {
        // console.log(`Category ${newValue.id} updated successfully`);
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
        // console.log(`Ingredient ${newValue.id} updated successfully`);
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

  if (!items) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.centerText}>
          Aan het laden...
        </Text>
      </View>
    );
  }

  return (
    <>
      <View>
        <HeaderComponent
          uri="https://i.imgur.com/yqWH29P.jpeg"
          isHeader={true}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map((categoryWithIngredients, index) => (
          <View key={`category-${index}`} style={[styles.categoryContainer, styles.backgroundWhite]}>
            <View style={[styles.row, styles.backgroundWhite]}>
              <CheckboxComponent
                key={categoryWithIngredients.id}
                id={categoryWithIngredients.id}
                checked={categoryWithIngredients.checked}
                onValueChange={handleCategoryChange}
              />
              <Text style={styles.categoryHeader}>{categoryWithIngredients.label}</Text>
            </View>
            <View style={[styles.indented, styles.backgroundWhite]}>
              {categoryWithIngredients.value.map((ingredient) => (
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
        ))}
      </ScrollView >
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 24,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
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
