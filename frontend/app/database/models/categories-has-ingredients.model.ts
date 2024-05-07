import { AuditableInterface } from '@interfaces/auditable.interface';
import { Model } from '@nozbe/watermelondb';
import { field, immutableRelation } from '@nozbe/watermelondb/decorators';

class CategoriesHasIngredientsModel extends Model implements AuditableInterface {
  static readonly table = 'categories_has_ingredients';

  @field('category_id') categoryId!: string;
  @field('ingredient_id') ingredientId!: string;
  @field('created_at') createdAt!: number;
  @field('updated_at') updatedAt!: number;

  /**
   * frontend/app/database/seeds/categories-has-ingredients.seeder.ts
   * Above file doesn't work if datatype isn't <<any>>.
   * WatermelonDB docs also use <<any>> datatype: https://watermelondb.dev/docs/Relation
   */
  @immutableRelation('categories', 'category_id') category!: any;
  @immutableRelation('ingredients', 'ingredient_id') ingredient!: any;
}

export default CategoriesHasIngredientsModel;
