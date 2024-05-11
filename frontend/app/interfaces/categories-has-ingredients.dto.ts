export interface CategoriesHasIngredientsDTO {
    id: string;
    name: string;
    ingredients: {
        id: string;
        name: string;
        key: string;
    }[];
}
