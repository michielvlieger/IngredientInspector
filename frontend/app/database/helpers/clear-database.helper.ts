import { database } from '../database-setup';
import { CategoriesModel, IngredientsModel, UsersModel, CategoriesHasIngredientsModel } from '@models';

const clearDatabase = async (): Promise<void> => {
    await database.write(async () => {
        const categoriesCollection = database.collections.get<CategoriesModel>('categories');
        const ingredientsCollection = database.collections.get<IngredientsModel>('ingredients');
        const usersCollection = database.collections.get<UsersModel>('users');
        const categoriesHasIngredientsCollection = database.collections.get<CategoriesHasIngredientsModel>('categories_has_ingredients');

        // Delete all records from each collection
        await Promise.all([
            categoriesCollection.query().destroyAllPermanently(),
            ingredientsCollection.query().destroyAllPermanently(),
            usersCollection.query().destroyAllPermanently(),
            categoriesHasIngredientsCollection.query().destroyAllPermanently(),
        ]);
    });
};

clearDatabase().then(() => {
    console.log('Database has been cleared.');
}).catch((error) => {
    console.error('Failed to clear the database:', error);
});

export default clearDatabase;
