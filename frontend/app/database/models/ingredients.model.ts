import { AuditableInterface, IngredientsInterface } from '@interfaces';
import { Model, Q } from '@nozbe/watermelondb';
import { date, field, lazy } from '@nozbe/watermelondb/decorators';

class IngredientsModel extends Model implements AuditableInterface, IngredientsInterface {
  static readonly table = 'ingredients';
  static associations = {
    categories_has_ingredients: { type: 'has_many', foreignKey: 'ingredient_id' },
  } as const;  // Use 'as const' to ensure type literals are used.

  @field('key') key!: string;
  @field('name') name!: string;
  @date('created_at') updatedAt!: number;
  @date('updated_at') createdAt!: number;

  @lazy
  categories = this.collections
    .get('categories')
    .query(Q.on('categories_has_ingredients', 'ingredient_id', this.id));
}

export default IngredientsModel;
