import { Database, appSchema } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { preferencesSchema, ingredientsSchema, categoriesSchema, categoriesHasIngredientsSchema } from '@schemas/index.schema';
import { PreferencesModel, IngredientsModel, CategoriesModel, CategoriesHasIngredientsModel } from '@models/index.model';
import { Platform } from 'react-native';

const adapter = new SQLiteAdapter({
  // dbName: 'database.sqlite3', // Optional, useful for debugging.
  schema: appSchema({
  version: 1,  // Increment this number every time the database is changed. Only when migration strategy is implemented.
  tables: [
      preferencesSchema,
      ingredientsSchema,
      categoriesSchema,
      categoriesHasIngredientsSchema,
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
    CategoriesModel,
    CategoriesHasIngredientsModel,
  ],
});

export {
  adapter,
  database,
}
