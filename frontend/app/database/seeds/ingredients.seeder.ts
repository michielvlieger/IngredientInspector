import { Collection } from '@nozbe/watermelondb';
import { database } from '../database-setup';
import ingredients from './data/ingredients.json';
import { IngredientsModel } from '@models';
import { AuditableInterface, IngredientsInterface } from '@interfaces';

const seedIngredients = async (): Promise<void> => {
  await database.write(async () => {
    const ingredientCollection: Collection<IngredientsModel> = database.collections.get('ingredients');

    const seedData: (IngredientsInterface & AuditableInterface)[] = ingredients.map(ingredient => ({
      key: ingredient.key,  // This is used to identify the ingredient.
      name: ingredient.name,
      checked: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }));

    await Promise.all(seedData.map(async data => {
      await ingredientCollection.create(entry => {
        entry.key = data.key;
        entry.name = data.name;
        entry.checked = data.checked;
        entry.createdAt = data.createdAt;
        entry.updatedAt = data.updatedAt;
      });
    }));
  });
};

export default seedIngredients;
