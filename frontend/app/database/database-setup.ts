import { Database, appSchema } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { PreferenceModel } from '@models/index.model';
import { preferenceSchema } from '@schemas/index.schema';
import { Platform } from 'react-native';

const adapter = new SQLiteAdapter({
  // dbName: 'database.sqlite3', // Optional, useful for debugging.
  schema: appSchema({
  version: 1,
  tables: [
      preferenceSchema,
    ],
  }),
  jsi: Platform.OS === 'ios', // Dynamically set to true if the platform is iOS.
});

const database = new Database({
  adapter,
  modelClasses: [
    PreferenceModel
  ],
});

export {
  adapter,
  database,
}
