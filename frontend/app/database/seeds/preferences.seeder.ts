import { Collection } from '@nozbe/watermelondb';
import { database } from '../database-setup';
import { PreferencesModel } from '@models';
import { AuditableInterface, PreferencesInterface } from '@interfaces';

const seedPreferences = async (): Promise<void> => {
  await database.write(async () => {
    const preferenceCollection: Collection<PreferencesModel> = database.collections.get('preferences');

    const seedData: (PreferencesInterface & AuditableInterface)[] = [
      {
        title: "Dark Mode",
        description: "Whether dark mode is enabled",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Notifications",
        description: "Whether notifications are enabled",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    await Promise.all(seedData.map(async data => {
      await preferenceCollection.create(entry => {
        entry.title = data.title;
        entry.description = data.description;
        entry.createdAt = data.createdAt;
        entry.updatedAt = data.updatedAt;
      });
    }));
  });
};

export default seedPreferences;
