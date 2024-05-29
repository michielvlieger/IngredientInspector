export interface OpenfoodfactsIngredientInterface {
    id: string,
    percent_estimate: number,
    percent_max: number,
    percent_min: number,
    text: string,
    vegan?: string,
    vegetarian?: string,
    ciqual_food_code?: string,
    processing?: string,
    ingredients?: OpenfoodfactsIngredientInterface[],
}