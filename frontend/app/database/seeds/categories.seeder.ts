import { Collection } from '@nozbe/watermelondb';
import { CategoriesModel } from '@models/index.model';
import { database } from '../database-setup';
import { CategoriesInterface, AuditableInterface } from '@/app/interfaces/index.interface';

const seedCategories = async (): Promise<void> => {
  await database.write(async () => {
    const categoriesCollection: Collection<CategoriesModel> = database.collections.get('categories');

    const seedData: (CategoriesInterface & AuditableInterface)[] = [
      {
        name: "Vegan",
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
