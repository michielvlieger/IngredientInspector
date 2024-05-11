import { PreferencesInterface } from '@interfaces';
import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';
import { AuditableInterface } from 'app/interfaces/auditable.interface';

class PreferencesModel extends Model implements AuditableInterface, PreferencesInterface {
  static readonly table = 'preferences';

  @field('title') title!: string;
  @field('description') description!: string;
  @date('created_at') createdAt!: number;
  @date('updated_at') updatedAt!: number;
}

export default PreferencesModel;
