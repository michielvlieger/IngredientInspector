import { ONBOARDING_STEPS } from '@enums';
import { AuditableInterface, UsersInterface } from '@interfaces';
import { Model, Q } from '@nozbe/watermelondb';
import { date, field } from '@nozbe/watermelondb/decorators';

class UsersModel extends Model implements AuditableInterface, UsersInterface {
  static readonly table = 'users';

  @field('onboarding') onboarding!: ONBOARDING_STEPS; // Column to keep track of onboarding step or status.
  @date('created_at') createdAt!: number;
  @date('updated_at') updatedAt!: number;
}

export default UsersModel;
