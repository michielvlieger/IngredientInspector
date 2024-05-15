import { AuditableInterface } from '@interfaces';
import { Model } from '@nozbe/watermelondb';
import { field, immutableRelation } from '@nozbe/watermelondb/decorators';

class CategoriesHasIngredientsModel extends Model implements AuditableInterface {
  static readonly table = 'categories_has_ingredients';
  static readonly associations = {
    categories: { type: 'belongs_to', key: 'category_id' },
    ingredients: { type: 'belongs_to', key: 'ingredient_id' },
  } as const;

  @field('created_at') createdAt!: number;
  @field('updated_at') updatedAt!: number;

  @immutableRelation('categories', 'category_id') category!: any;
  @immutableRelation('ingredients', 'ingredient_id') ingredient!: any;
}

export default CategoriesHasIngredientsModel;
