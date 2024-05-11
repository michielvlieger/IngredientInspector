import { CategoriesHasIngredientsDTO } from "@interfaces";
import { database } from "../database/database-setup";
import CategoriesModel from "../database/models/categories.model";
import IngredientsModel from "../database/models/ingredients.model";

async function getAllCategoriesWithIngredients(): Promise<CategoriesHasIngredientsDTO[]> {
    const categories = await database.get<CategoriesModel>('categories').query().fetch();

    return await Promise.all(categories.map(async category => {
        const ingredients = await category.ingredients.fetch() as IngredientsModel[];

        return {
            id: category.id,
            name: category.name,
            ingredients: ingredients.map(ingredient => ({ id: ingredient.id, name: ingredient.name, key: ingredient.key })),
        };
    }));
}

export default getAllCategoriesWithIngredients;

