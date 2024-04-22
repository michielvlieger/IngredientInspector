import { AuditableInterface, IngredientsInterface } from '@/app/interfaces/index.interface';
import { Model } from '@nozbe/watermelondb';
import { date, field } from '@nozbe/watermelondb/decorators';

class IngredientsModel extends Model implements AuditableInterface, IngredientsInterface {
  static readonly table = 'ingredients';

  @field('key') key!: string;
  @field('name') name!: string;
  @date('created_at') updatedAt!: number;
  @date('updated_at') createdAt!: number;
}

export default IngredientsModel;
