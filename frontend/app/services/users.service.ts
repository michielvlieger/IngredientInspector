import { UsersDTO } from "@interfaces";
import { database } from "../database/database-setup";
import { UsersModel } from "@models";
import { ONBOARDING_STEPS } from "@enums";

async function getAllUsers(): Promise<UsersDTO[]> {
    const users = await database.get<UsersModel>('users').query().fetch();

    return await Promise.all<UsersDTO>(users.map(async user => {
        return {
            id: user.id,
            onboarding: user.onboarding,
        } as UsersDTO;
    }));
}

async function getOnboardingStatusFromDatabase(userId: string): Promise<string> {
    const user = await database.get<UsersModel>('users').find(userId);
    return user.onboarding;
};

async function updateOnboardingStatusInDatabase(userId: string, status: ONBOARDING_STEPS): Promise<void> {
    await database.write(async () => {
        const user = await database.get<UsersModel>('users').find(userId);
        await user.update(userRecord => {
            userRecord.onboarding = status;
        });
    });
}

export {
    getAllUsers,
    getOnboardingStatusFromDatabase,
    updateOnboardingStatusInDatabase,
}