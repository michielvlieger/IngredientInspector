import { IngredientsDTO } from "@interfaces";
import { database } from "../database/database-setup";
import { IngredientsModel } from "@models";
import { Q } from "@nozbe/watermelondb";

async function getIngredientByKey(findByKey: string): Promise<IngredientsDTO> {
    const ingredients = await database.get<IngredientsModel>('ingredients').query(Q.where('key', findByKey)).fetch();
    return ingredients[0]
}

export default getIngredientByKey;
