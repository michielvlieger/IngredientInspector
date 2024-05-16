import { UsersDTO } from "@interfaces";
import { database } from "../database/database-setup";
import { UsersModel } from "@models";

async function getAllUsers(): Promise<UsersDTO[]> {
    const users = await database.get<UsersModel>('users').query().fetch();

    return await Promise.all<UsersDTO>(users.map(async user => {
        return {
            id: user.id,
            onboarding: user.onboarding,
        } as UsersDTO;
    }));
}

export default getAllUsers;
