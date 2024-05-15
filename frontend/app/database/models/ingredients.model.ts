import { AuditableInterface, IngredientsInterface } from '@interfaces';
import { CategoriesModel } from '@models';
import { Model, Q } from '@nozbe/watermelondb';
import { date, field, lazy } from '@nozbe/watermelondb/decorators';

class IngredientsModel extends Model implements AuditableInterface, IngredientsInterface {
  static readonly table = 'ingredients';
  static associations = {
    categories_has_ingredients: { type: 'has_many', foreignKey: 'ingredient_id' },
  } as const;

  @field('key') key!: string;
  @field('name') name!: string;
  @field('checked') checked!: boolean;
  @date('created_at') createdAt!: number;
  @date('updated_at') updatedAt!: number;

  @lazy
  categories = this.collections
    .get<CategoriesModel>('categories')
    .query(Q.on('categories_has_ingredients', 'ingredient_id', this.key));
}

export default IngredientsModel;
