import CategoriesModel from "./categories.model";
import CategoriesHasIngredientsModel from "./categories-has-ingredients.model";
import IngredientsModel from "./ingredients.model";
import UsersModel from "./users.model";

// Array of models for enumeration.
export const models = [
    IngredientsModel,
    CategoriesModel,
    CategoriesHasIngredientsModel,
    UsersModel,
]

// Named exports for destructuring.
export {
    IngredientsModel,
    CategoriesModel,
    CategoriesHasIngredientsModel,
    UsersModel,
}