import { IngredientsModel } from "@models";
import { getAllCategoriesWithIngredients } from "@services";

async function allCategoriesWithIngredientsWithCheckboxes() {
    const categoriesWithIngredients = await getAllCategoriesWithIngredients();

    return categoriesWithIngredients.map(categoryWithIngredients => {
        return {
            id: categoryWithIngredients.id,
            label: categoryWithIngredients.name,
            value: categoryWithIngredients.ingredients.map(ingredient => {
                return {
                    id: ingredient.id,
                    label: ingredient.name,
                    value: ingredient as IngredientsModel,
                    checked: false,
                }
            }),
            checked: false,
        };
    });
}

export default allCategoriesWithIngredientsWithCheckboxes;

