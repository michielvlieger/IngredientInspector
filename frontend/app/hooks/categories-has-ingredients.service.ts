import { CategoriesHasIngredientsDTO, CheckboxInterface } from "@interfaces";
import { CategoriesHasIngredientsModel, CategoriesModel, IngredientsModel } from "@models";
import { Collection, Q } from "@nozbe/watermelondb";
import { getAllCategoriesWithIngredients } from "@services";
import { database } from "app/database/database-setup";

async function allCategoriesWithIngredientsWithCheckboxes() {
    const categoriesWithIngredients = await getAllCategoriesWithIngredients();
    const categoryHasIngredientsCollection = database.collections.get('categories_has_ingredients') as Collection<CategoriesHasIngredientsModel>;

    return Promise.all(categoriesWithIngredients.map(async (categoryWithIngredients) => {
        const ingredients = await Promise.all(categoryWithIngredients.ingredients.map(async (ingredient) => {
            const checkedRecords = await categoryHasIngredientsCollection.query(
                Q.where('ingredient_id', ingredient.id)
            ).fetch();

            const checked = checkedRecords.length > 0 ? checkedRecords[0].checked : false;

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
            checked: false,
        };
    }));
}

async function insertOrUpdateCategoryIngredientRelation(newValue: CheckboxInterface): Promise<void> {
    await database.write(async () => {
        const { categoryId, ingredientId, checked } = newValue;
        const entriesCollection = database.collections.get('categories_has_ingredients') as Collection<CategoriesHasIngredientsModel>;
        const existingEntries = await entriesCollection.query(
            Q.where('category_id', categoryId),
            Q.where('ingredient_id', ingredientId)
        ).fetch();

        if (existingEntries.length > 0) {
            const now = Date.now();
            await database.batch(
                ...existingEntries.map(entry => entry.prepareUpdate(() => {
                    entry.updatedAt = now;
                    entry.checked = checked;
                }))
            );
        } else {
            await entriesCollection.create(entry => {
                entry.category.id = categoryId;
                entry.ingredient.id = ingredientId;
                const now = Date.now();
                entry.createdAt = now;
                entry.updatedAt = now;
                entry.checked = checked;
            });
        }
    });
}

export {
    allCategoriesWithIngredientsWithCheckboxes,
    insertOrUpdateCategoryIngredientRelation,
}