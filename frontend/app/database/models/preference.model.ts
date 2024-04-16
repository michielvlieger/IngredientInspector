import { PreferenceInterface } from '@interfaces/preference.interface';
import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

class PreferenceModel extends Model implements PreferenceInterface {
  static readonly table = 'preference';

  @field('title') title!: string;
  @field('description') description!: string;
  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
}

export default PreferenceModel;
