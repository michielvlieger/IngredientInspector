import CategoriesModel from "../database/models/categories.model";
import IngredientsModel from "../database/models/ingredients.model";

export interface CategoriesHasIngredientsInterface {
  category: CategoriesModel;
  ingredient: IngredientsModel;
}
