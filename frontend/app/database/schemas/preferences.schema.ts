import { tableSchema } from '@nozbe/watermelondb';

const preferencesSchema = tableSchema({
      name: 'preferences',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    });

export default preferencesSchema;
