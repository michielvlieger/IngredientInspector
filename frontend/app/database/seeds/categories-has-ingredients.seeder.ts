import { Collection, Q } from '@nozbe/watermelondb';
import { database } from '../database-setup';
import { CategoriesInterface, IngredientsInterface } from '@interfaces';
import CategoriesHasIngredientsModel from '../models/categories-has-ingredients.model';
import { CategoriesModel, IngredientsModel } from '@models';


const seedCategoriesHasIngredients = async (): Promise<void> => {
  await database.write(async () => {
    const categoriesCollection: Collection<CategoriesModel> = database.collections.get('categories');
    const ingredientsCollection: Collection<IngredientsModel> = database.collections.get('ingredients');
    const categoriesHasIngredientsCollection: Collection<CategoriesHasIngredientsModel> = database.collections.get('categories_has_ingredients');

    const categories = await categoriesCollection.query(Q.where('name', 'Vegan')).fetch();

    const seedData: ({ category: CategoriesInterface, ingredient: IngredientsInterface })[] = [
      {
        category: categories[0],
        ingredient: (await ingredientsCollection.query(Q.where('key', 'en:tomato')).fetch())[0],
      },
      {
        category: categories[0],
        ingredient: (await ingredientsCollection.query(Q.where('key', 'en:free-range-eggs')).fetch())[0],
      },
      {
        category: categories[0],
        ingredient: (await ingredientsCollection.query(Q.where('key', 'en:free-range-egg-yolk')).fetch())[0],
      },
    ];

    await Promise.all(seedData.map(async data => {
      await categoriesHasIngredientsCollection.create(entry => {
        entry.category.id = data.category.id;
        entry.ingredient.id = data.ingredient.id;
      });
    }));
  });
};

export default seedCategoriesHasIngredients;
