import { IngredientsDTO } from "./ingredients.dto";

export interface CategoriesHasIngredientsDTO {
    id: string;
    name: string;
    ingredients: IngredientsDTO[];
}
