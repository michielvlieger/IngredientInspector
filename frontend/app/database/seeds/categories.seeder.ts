import { Collection } from '@nozbe/watermelondb';
import { database } from '../database-setup';
import { AuditableInterface, CategoriesInterface } from '@interfaces';
import { CategoriesModel } from '@models';

const seedCategories = async (): Promise<void> => {
  await database.write(async () => {
    const categoriesCollection: Collection<CategoriesModel> = database.collections.get('categories');

    const seedData: (CategoriesInterface & AuditableInterface)[] = [
      {
        name: "Vegan",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "E-nummers",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: "Allergiën",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    await Promise.all(seedData.map(async data => {
      await categoriesCollection.create(entry => {
        entry.name = data.name;
        entry.createdAt = data.createdAt;
        entry.updatedAt = data.updatedAt;
      });
    }));
  });
};

export default seedCategories;
