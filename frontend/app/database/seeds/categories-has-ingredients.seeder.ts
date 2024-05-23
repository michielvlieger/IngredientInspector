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

    const categories = await categoriesCollection.query().fetch();

    const veganCategory = categories.find(category => category.name === 'Vegan');
    const enummersCategory = categories.find(category => category.name === 'E-nummers');
    const allergieenCategory = categories.find(category => category.name === 'Allergiën');

    if (!veganCategory || !enummersCategory || !allergieenCategory) {
      throw new Error('One or more required categories are missing');
    }

    const veganKeys = [
      'en:tomato',
      'en:free-range-eggs',
      'en:free-range-egg-yolk'
    ];

    const enummersKeys = [
      'en:e412',
      'en:e415',
      'en:e202'
    ];

    const allergieenKeys = [
      'en:soya',
      'en:celery',
      'en:mustard'
    ];

    const veganSeedData: { category: CategoriesInterface; ingredient: IngredientsInterface }[] = await Promise.all(
      veganKeys.map(async (key) => {
        const ingredient = (await ingredientsCollection.query(Q.where('key', key)).fetch())[0];
        return {
          category: veganCategory as CategoriesInterface,
          ingredient: ingredient as IngredientsInterface
        };
      })
    );

    const enummersSeedData: { category: CategoriesInterface; ingredient: IngredientsInterface }[] = await Promise.all(
      enummersKeys.map(async (key) => {
        const ingredient = (await ingredientsCollection.query(Q.where('key', key)).fetch())[0];
        return {
          category: enummersCategory as CategoriesInterface,
          ingredient: ingredient as IngredientsInterface
        };
      })
    );

    const allergieenSeedData: { category: CategoriesInterface; ingredient: IngredientsInterface }[] = await Promise.all(
      allergieenKeys.map(async (key) => {
        const ingredient = (await ingredientsCollection.query(Q.where('key', key)).fetch())[0];
        return {
          category: allergieenCategory as CategoriesInterface,
          ingredient: ingredient as IngredientsInterface
        };
      })
    );

    const seedData = [...veganSeedData, ...enummersSeedData, ...allergieenSeedData];

    await Promise.all(seedData.map(async data => {
      await categoriesHasIngredientsCollection.create(entry => {
        entry.category.id = data.category.id;
        entry.ingredient.id = data.ingredient.id;
      });
    }));
  });
};

export default seedCategoriesHasIngredients;
