import { CategoriesInterface } from '@/app/interfaces/categories.interface';
import { AuditableInterface } from '@/app/interfaces/index.interface';
import { Model } from '@nozbe/watermelondb';
import { date, field } from '@nozbe/watermelondb/decorators';

class CategoriesModel extends Model implements AuditableInterface, CategoriesInterface {
  static readonly table = 'categories';
  @field('name') name!: string;
  @date('created_at') updatedAt!: number;
  @date('updated_at') createdAt!: number;
}

export default CategoriesModel;
