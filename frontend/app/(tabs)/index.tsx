import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import CheckboxComponent from 'components/Checkbox';
import { allCategoriesWithIngredientsWithCheckboxes, insertOrUpdateCategoryIngredientRelation } from '@hooks';
import { IngredientsModel } from '@models';
import HeaderComponent from 'components/Header';



const CheckboxContainer: React.FC = () => {
  // Define 'items' as state so updates will cause the component to re-render.
  const [items, setItems] = useState<{ id: string; label: string; value: { id: string; label: string; value: IngredientsModel; checked: boolean; }[]; checked: boolean; }[] | null>(null);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await allCategoriesWithIngredientsWithCheckboxes();
        setItems(response);
      } catch (error) {
        console.error(error);
      }
    }

    getItems();
  }, []);

  // Loading screen for async code.
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
    <><View>
      <HeaderComponent uri="https://i.imgur.com/yqWH29P.jpeg" />
    </View>
      <View style={styles.container}>
        {items.map((categoryWithIngredients, index) => (
          <View key={`category-${index}`}>
            <Text style={styles.categoryHeader}>{categoryWithIngredients.label}</Text>
            {categoryWithIngredients.value.map((ingredient, ingIndex) => (
              <CheckboxComponent
                key={`ingredient-${index}-${ingIndex}`}
                categoryId={categoryWithIngredients.id}
                ingredientId={ingredient.id}
                label={ingredient.label}
                checked={ingredient.checked}
                onValueChange={(newValue) => insertOrUpdateCategoryIngredientRelation(newValue)} />
            ))}
          </View>
        ))}
      </View></>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1, // Use flex to enable flexible box layout
    justifyContent: 'center', // Center content vertically in the container
    alignItems: 'center' // Center content horizontally
  },
  centerText: {
    textAlign: 'center',
    fontSize: 24,
  },
  container: {
    margin: 24,
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 12,
  },
  categoryHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default CheckboxContainer;
