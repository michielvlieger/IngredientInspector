import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CheckboxComponent from 'components/Checkbox';
import { allCategoriesWithIngredientsWithCheckboxes, enableOrDisableAllCategoryIngredients, updateCheckboxStatusOfIngredient } from '@hooks';
import HeaderComponent from 'components/Header';
import { CheckboxInterface } from '@interfaces';

const Preferences: React.FC = () => {
  const [items, setItems] = useState<{ id: string; label: string; checked: boolean; value: CheckboxInterface[]; }[] | null>(null);

  useEffect(() => {
    const getPreferenceItems = async () => {
      try {
        const response = await allCategoriesWithIngredientsWithCheckboxes();
        setItems(response);
      } catch (error) {
        console.error(error);
      }
    };

    getPreferenceItems();
  }, []);

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
          isHeader={true} // Indicating it's a header
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
                onValueChange={(newValue) => enableOrDisableAllCategoryIngredients(newValue)}
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
                  onValueChange={(newValue) => updateCheckboxStatusOfIngredient(newValue)}
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
    marginBottom: 16, // Add space between categories
  },
  categoryHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    marginLeft: 12, // Add indentation to ingredients
    flexDirection: 'row',
    alignItems: 'center',
  },
  indented: {
    marginLeft: 36, // Add indentation to ingredients
  },
  backgroundWhite: {
    backgroundColor: '#fff',
    borderRadius: 8,
  }
});

export default Preferences;
