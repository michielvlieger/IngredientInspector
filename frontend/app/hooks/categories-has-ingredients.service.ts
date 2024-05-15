import { CheckboxInterface } from "@interfaces";
import { CategoriesHasIngredientsModel, IngredientsModel } from "@models";
import { Collection, Q } from "@nozbe/watermelondb";
import { getAllCategoriesWithIngredients } from "@services";
import { database } from "app/database/database-setup";

async function allCategoriesWithIngredientsWithCheckboxes() {
    const categoriesWithIngredients = await getAllCategoriesWithIngredients();
    const categoryHasIngredientsCollection = database.collections.get('categories_has_ingredients') as Collection<CategoriesHasIngredientsModel>;
    const checked = true;

    return Promise.all(categoriesWithIngredients.map(async (categoryWithIngredients) => {
        const ingredients = await Promise.all(categoryWithIngredients.ingredients.map(async (ingredient) => {
            const checkedRecords = await categoryHasIngredientsCollection.query(
                Q.where('ingredient_id', ingredient.id)
            ).fetch();


            return {
                id: ingredient.id,
                label: ingredient.name,
                value: ingredient as IngredientsModel,
                checked: checked,
            };
        }));

        return {
            id: categoryWithIngredients.id,
            label: categoryWithIngredients.name,
            value: ingredients,
            checked: checked,
        };
    }));
}

async function updateCheckboxStatusOfIngredients(newValue: CheckboxInterface) {
    await database.write(async () => {
        const { ingredientId, checked } = newValue;
        const ingredientsCollection = database.collections.get('ingredients') as Collection<IngredientsModel>;
        const existingEntries = await ingredientsCollection.query(
            Q.where('id', ingredientId)
        ).fetch();

        const now = Date.now();

        if (existingEntries.length > 0) {
            await database.batch(
                ...existingEntries.map(entry => entry.prepareUpdate(() => {
                    entry.updatedAt = now;
                    entry.checked = checked;
                }))
            );
        } else {
            await ingredientsCollection.create(entry => {
                entry.key = ingredientId;
                entry.createdAt = now;
                entry.updatedAt = now;
                entry.checked = checked;
            });
        }
    });
}
export {
    allCategoriesWithIngredientsWithCheckboxes,
    updateCheckboxStatusOfIngredients,
}
