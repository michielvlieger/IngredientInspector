import { CategoriesHasIngredientsDTO } from "@interfaces";
import { database } from "../database/database-setup";
import { CategoriesModel } from "@models";

async function getAllCategoriesWithIngredients(): Promise<CategoriesHasIngredientsDTO[]> {
    const categories = await database.get<CategoriesModel>('categories').query().fetch();

    return await Promise.all(categories.map(async category => {
        const ingredients = await category.ingredients.fetch();
        return {
            id: category.id,
            name: category.name,
            ingredients: ingredients.map(ingredient => ({
                id: ingredient.id,
                key: ingredient.key,
                name: ingredient.name,
                checked: ingredient.checked
            })),
        };
    }));
}

export default getAllCategoriesWithIngredients;
