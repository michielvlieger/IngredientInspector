import { Collection } from '@nozbe/watermelondb';
import { database } from '../database-setup'; // Adjust the path as necessary
import { PreferenceInterface } from '@interfaces/preference.interface';
import { PreferenceModel } from '../models/index.model';

const seedPreferences = async (): Promise<void> => {
  await database.write(async () => {
    const preferenceCollection: Collection<PreferenceModel> = database.collections.get('preference');

    const seedData: PreferenceInterface[] = [
      {
        title: "Dark Mode",
        description: "Whether dark mode is enabled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Notifications",
        description: "Whether notifications are enabled",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more entries as needed.
    ];

    await Promise.all(seedData.map(async data => {
      await preferenceCollection.create(entry => {
        entry.title = data.title;
        entry.description = data.description;
        entry.createdAt = new Date(data.createdAt);
        entry.updatedAt = new Date(data.updatedAt);
      });
    }));
  });
};

export default seedPreferences;
