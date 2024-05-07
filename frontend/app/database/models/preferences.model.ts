import { AuditableInterface, PreferencesInterface } from '@/app/interfaces/index.interface';
import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

class PreferencesModel extends Model implements AuditableInterface, PreferencesInterface {
  static readonly table = 'preferences';

  @field('title') title!: string;
  @field('description') description!: string;
  @date('created_at') createdAt!: number;
  @date('updated_at') updatedAt!: number;
}

export default PreferencesModel;
