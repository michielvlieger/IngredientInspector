import seedIngredients from "./ingredients.seeder";
import seedPreferences from "./preferences.seeder";

async function runAllSeeds(){
    try {
        await seedIngredients();
        await seedPreferences();
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
 */
// runAllSeeds();
