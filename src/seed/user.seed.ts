import {UserDao} from "../dao/user.dao";
import {DUser} from "../models/user-model";

export const adminEmail = `admin@test.com`;

export default async function seedUsers() {
    const user: DUser = {
        password: "sAdmin",
        name: `Super Admin`,
        email: "admin@email.com",
        number: "1234567890",
        role: "admin",
        active: true,
    };
    const user1 = await createUser(user);
    return [user1];
}

async function createUser(user: DUser) {
    const existingUser = await UserDao.getUserByEmail(user.email);
    if (existingUser) {
        return existingUser;
    }
    return await UserDao.createUser(user);
}
