import { Database, appSchema } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { preferencesSchema, ingredientsSchema } from '@schemas/index.schema';
import { PreferencesModel, IngredientsModel } from '@models/index.model';
import { Platform } from 'react-native';

const adapter = new SQLiteAdapter({
  // dbName: 'database.sqlite3', // Optional, useful for debugging.
  schema: appSchema({
  version: 2,  // Increment this number every time the database is changed.
  tables: [
      preferencesSchema,
      ingredientsSchema,
    ],
  }),
  jsi: Platform.OS === 'ios', // Dynamically set to true if the platform is iOS.
  onSetUpError: error => {
    console.error(error);
  }
  // TODO: add migration strategy.
});

const database = new Database({
  adapter,
  modelClasses: [
    PreferencesModel,
    IngredientsModel,
  ],
});

export {
  adapter,
  database,
}
