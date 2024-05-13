import { tableSchema } from '@nozbe/watermelondb';

const categoriesHasIngredientsSchema = tableSchema({
  name: 'categories_has_ingredients',
  columns: [
    { name: 'category_id', type: 'string', isIndexed: true },
    { name: 'ingredient_id', type: 'string', isIndexed: true },
    { name: 'checked', type: 'boolean' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' }
  ]
});

export default categoriesHasIngredientsSchema;
