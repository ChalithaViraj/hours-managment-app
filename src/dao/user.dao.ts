import {AppLogger} from "../common/logging";
import {ApplicationError} from "../common/application-error";
import {DUser, IUser} from "../models/user-model";
import User from "../schemas/user-schema";
import {StringOrObjectId} from "../common/util";

export namespace UserDao {

    const populateOptions = [
        'groups',
        'dealer',
        'photo',
    ];

    export async function createUser(data: DUser): Promise<string> {
        const existingUser = await getUserByEmail(data.email);
        if (existingUser) {
            throw new ApplicationError("Email Already Exists");
        }
        const user: IUser = new User(data);
        AppLogger.info(`New User created, userID: ${user.id}`);
        await user.save();
        return await authenticateUser(data.email, data.password);
    }

    export async function getUserByEmail(email: string): Promise<IUser | null> {
        let user: IUser = await User.findOne({email: email}).populate(populateOptions);
        AppLogger.info(`Got user for email, userID: ${user ? user.id : "None"}`);
        return user;
    }

    export async function getUserById(id: StringOrObjectId): Promise<IUser> {
        // console.log("dao" + id);
        let user: IUser = await User.findById(id);
        if (!user) {
            throw new ApplicationError("User not found for Id: " + id);
        }
        AppLogger.info(`Got user for id, userID: ${user}`);
        return user;
    }

    export async function updateUser(id: StringOrObjectId, data: Partial<DUser>): Promise<IUser> {
        await User.findByIdAndUpdate(id, data);
        AppLogger.info(`Updated user by ID ${id}`);
        return getUserById(id);
    }

    export async function authenticateUser(email: string, password: string): Promise<string> {
        const user = await getUserByEmail(email);
        if (user) {
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new ApplicationError('Incorrect email/password combination');
            }
            return user.createAccessToken();
        } else {
            throw new ApplicationError('Email not found');
        }
    }

    export async function comparePasswordToChange(email: string, password: string): Promise<boolean> {
        const user = await getUserByEmail(email);
        if (user) {
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                throw new ApplicationError('Incorrect email');
            }
            return true;
        }
    }

    export async function getAllUsers(): Promise<IUser []> {
        const users = await User.find({active: true});
        AppLogger.info(`get All Users`);
        return users;
    }

    export async function deleteUser(id: StringOrObjectId): Promise<IUser> {
        AppLogger.info(`User deleted by ID ${id}`);
        return User.findByIdAndRemove(id);
    }

    export async function changePassword(data: DUser): Promise<IUser> {
        const user1 = await getUserById(data.id);
        user1.password = data.password;
        await user1.save();
        return user1;
    }
}
