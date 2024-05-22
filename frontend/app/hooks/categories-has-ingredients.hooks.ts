import { Observable } from 'rxjs';
import { CheckboxInterface } from "@interfaces";
import { CategoriesHasIngredientsModel, IngredientsModel } from "@models";
import { Collection, Q } from "@nozbe/watermelondb";
import { getAllCategoriesWithIngredients } from "@services";
import { database } from "app/database/database-setup";

// Function to get all categories with ingredients and checkboxes.
export function allCategoriesWithIngredientsWithCheckboxes(): Observable<any[]> {
    return new Observable((subscriber) => {
        getAllCategoriesWithIngredients().then(categoriesWithIngredients => {
            Promise.all(categoriesWithIngredients.map(async (categoryWithIngredients) => {
                let categoryCheckbox = false;

                const ingredients = await Promise.all(categoryWithIngredients.ingredients.map(async (ingredient) => {
                    if (ingredient.checked && !categoryCheckbox) categoryCheckbox = true;

                    return {
                        id: ingredient.id,
                        label: ingredient.name,
                        value: ingredient as IngredientsModel,
                        checked: ingredient.checked,
                    };
                }));

                return {
                    id: categoryWithIngredients.id,
                    label: categoryWithIngredients.name,
                    value: ingredients,
                    checked: categoryCheckbox,
                };
            })).then(result => {
                subscriber.next(result);
                subscriber.complete();
                // console.log('Categories with ingredients loaded successfully');
            }).catch(error => {
                subscriber.error(error);
                // console.error('Error loading categories with ingredients', error);
            });
        }).catch(error => {
            subscriber.error(error);
            // console.error('Error loading categories with ingredients', error);
        });
    });
}

// Function to update checkbox status of an ingredient.
export function updateCheckboxStatusOfIngredient(newValue: CheckboxInterface): Observable<void> {
    return new Observable((subscriber) => {
        database.write(async () => {
            const ingredientsCollection = database.collections.get('ingredients') as Collection<IngredientsModel>;
            const existingEntries = await ingredientsCollection.query(Q.where('id', newValue.id)).fetch();

            const now = Date.now();

            await database.batch(
                ...existingEntries.map(entry => entry.prepareUpdate(() => {
                    entry.updatedAt = now;
                    entry.checked = newValue.checked;
                }))
            );

            subscriber.next();
            subscriber.complete();
            // console.log(`Ingredient ${newValue.id} updated successfully`);
        }).catch(error => {
            subscriber.error(error);
            // console.error('Error updating ingredient', error);
        });
    });
}

// Function to enable or disable all ingredients in a category.
export function enableOrDisableAllCategoryIngredients(newValue: CheckboxInterface): Observable<void> {
    return new Observable((subscriber) => {
        database.write(async () => {
            const categoryHasIngredients = database.collections.get<CategoriesHasIngredientsModel>('categories_has_ingredients');
            const getAllIngredientsOfCategory = await categoryHasIngredients.query(Q.where('category_id', newValue.id)).fetch();
            const ingredients = await Promise.all<IngredientsModel>(getAllIngredientsOfCategory.map(item => item.ingredient.fetch()));

            const now = Date.now();
            await database.batch(
                ...ingredients.map(entry => entry.prepareUpdate(() => {
                    entry.updatedAt = now;
                    entry.checked = newValue.checked;
                }))
            );

            subscriber.next();
            subscriber.complete();
            // console.log(`Category ${newValue.id} updated successfully`);
        }).catch(error => {
            subscriber.error(error);
            // console.error('Error updating category', error);
        });
    });
}
