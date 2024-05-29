import { tableSchema } from '@nozbe/watermelondb';

const ingredientsSchema = tableSchema({
  name: 'ingredients',
  columns: [
    { name: 'key', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'checked', type: 'boolean' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});

export default ingredientsSchema;
