import { tableSchema } from '@nozbe/watermelondb';

const usersSchema = tableSchema({
  name: 'users',
  columns: [
    { name: 'onboarding', type: 'string' }, // Column to keep track of onboarding step or status
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});

export default usersSchema;
