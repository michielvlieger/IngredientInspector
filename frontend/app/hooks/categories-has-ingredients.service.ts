import { CheckboxInterface } from "@interfaces";
import { CategoriesHasIngredientsModel, IngredientsModel } from "@models";
import { Collection, Q } from "@nozbe/watermelondb";
import { getAllCategoriesWithIngredients } from "@services";
import { database } from "app/database/database-setup";

async function allCategoriesWithIngredientsWithCheckboxes() {
    const categoriesWithIngredients = await getAllCategoriesWithIngredients();
    const categoryHasIngredientsCollection = database.collections.get('categories_has_ingredients') as Collection<CategoriesHasIngredientsModel>;

    return Promise.all(categoriesWithIngredients.map(async (categoryWithIngredients) => {
        let categoryCheckbox = false;

        const ingredients = await Promise.all(categoryWithIngredients.ingredients.map(async (ingredient) => {
            const checkedRecords = await categoryHasIngredientsCollection.query(
                Q.where('ingredient_id', ingredient.id)
            ).fetch();

            // If one of the checkboxes inside of the category is enabled, then the category is enabled as well.
            if (ingredient.checked && !categoryCheckbox) categoryCheckbox = true;

            return {
                id: ingredient.id,
                label: ingredient.name,
                value: ingredient as IngredientsModel,
                checked: ingredient.checked,
            };
        }));

        return {
            id: categoryWithIngredients.id,
            label: categoryWithIngredients.name,
            value: ingredients,
            checked: categoryCheckbox,
        };
    }));
}

async function updateCheckboxStatusOfIngredient(newValue: CheckboxInterface) {
    await database.write(async () => {
        const ingredientsCollection = database.collections.get('ingredients') as Collection<IngredientsModel>;
        const existingEntries = await ingredientsCollection.query(
            Q.where('id', newValue.id)
        ).fetch();

        const now = Date.now();

        await database.batch(
            ...existingEntries.map(entry => entry.prepareUpdate(() => {
                entry.updatedAt = now;
                entry.checked = newValue.checked;
            }))
        );
    });
}

async function enableOrDisableAllCategoryIngredients(newValue: CheckboxInterface) {
    await database.write(async () => {
        const categoryHasIngredients = database.collections.get<CategoriesHasIngredientsModel>('categories_has_ingredients');
        const getAllIngredientsOfCategory = await categoryHasIngredients.query(Q.where('category_id', newValue.id)).fetch();
        console.log(getAllIngredientsOfCategory);

        for (const item of getAllIngredientsOfCategory) {
            const ingredient = await item.ingredient.fetch();
            console.log(ingredient.key)
        }

        const ingredients = await Promise.all<IngredientsModel>(getAllIngredientsOfCategory.map(item => item.ingredient.fetch()));

        const now = Date.now();
        await database.batch(
            ...ingredients.map(entry => entry.prepareUpdate(() => {
                entry.updatedAt = now;
                entry.checked = newValue.checked;
            }))
        );
    });
}

export {
    allCategoriesWithIngredientsWithCheckboxes,
    updateCheckboxStatusOfIngredient,
    enableOrDisableAllCategoryIngredients,
}
