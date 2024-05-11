import { AuditableInterface, CategoriesInterface } from '@interfaces';
import { Model, Q } from '@nozbe/watermelondb';
import { date, field, lazy } from '@nozbe/watermelondb/decorators';

class CategoriesModel extends Model implements AuditableInterface, CategoriesInterface {
  static readonly table = 'categories';
  static associations = {
    categories_has_ingredients: { type: 'has_many', foreignKey: 'category_id' }
  } as const;  // Use 'as const' to ensure type literals are used.

  @field('name') name!: string;
  @date('created_at') createdAt!: number;
  @date('updated_at') updatedAt!: number;

  @lazy
  ingredients = this.collections
    .get('ingredients')
    .query(Q.on('categories_has_ingredients', 'category_id', this.id));
}

export default CategoriesModel;
