import { tableSchema } from '@nozbe/watermelondb';

const categoriesSchema = tableSchema({
      name: 'categories',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    });

export default categoriesSchema;
