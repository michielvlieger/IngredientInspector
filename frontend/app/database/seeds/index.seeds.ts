import seedCategoriesHasIngredients from "./categories-has-ingredients.seeder";
import seedCategories from "./categories.seeder";
import seedIngredients from "./ingredients.seeder";
import seedPreferences from "./preferences.seeder";

async function runAllSeeds(){
    try {
        console.info('Seeding preferences...');
        await seedPreferences();
        console.info('Preferences seeded.');

        console.info('Seeding categories...');
        await seedCategories();
        console.info('Categories seeded.');

        console.info('Seeding ingredients...');
        await seedIngredients();
        console.info('Ingredients seeded.');

        console.info('Seeding categories_has_ingredients...');
        await seedCategoriesHasIngredients();
        console.info('Categories_has_ingredients seeded.');

        console.info('Completed seeding database.');
    } catch(error) {
        console.error('Failed seeding database:', error);
    }
}

export default runAllSeeds;

/**
 * TODO: make package.json script out of this.
 * Seed database. Temporarily enable if you need to seed your database.
 * "seeds": "ts-node --project ./tsconfig.json -e \"require('./app/database/seeds/index.seeds').runAllSeeds()\""
 * The above command does not work at the moment, needs adjusting.
 * 
 * TODO: make migrations table that stores each table name as a string upon seeding success.
 * Used for checking if seeding is necessary or not. That way, below function can stay enabled.
 */
// runAllSeeds();
