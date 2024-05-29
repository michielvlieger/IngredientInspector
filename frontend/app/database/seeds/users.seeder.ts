import { Collection } from '@nozbe/watermelondb';
import { database } from '../database-setup';
import { UsersModel } from '@models';
import { AuditableInterface, UsersInterface } from '@interfaces';
import { ONBOARDING_STEPS } from '@enums';

const seedUsers = async (): Promise<void> => {
  await database.write(async () => {
    const usersCollection: Collection<UsersModel> = database.collections.get('users');

    const seedData: (UsersInterface & AuditableInterface)[] = [{
      onboarding: ONBOARDING_STEPS.STEP_1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }];

    await Promise.all(seedData.map(async data => {
      await usersCollection.create(entry => {
        entry.createdAt = data.createdAt;
        entry.updatedAt = data.updatedAt;
        entry.onboarding = data.onboarding;
      });
    }));
  });
};

export default seedUsers;
