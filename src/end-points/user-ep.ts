import {NextFunction, Request, Response} from "express";
import {Util} from "../common/util";
import {UserDao} from "../dao/user.dao";
import {DUser} from "../models/user-model";

export namespace UserEp {

    export async function authenticate(req: Request, res: Response, next: NextFunction) {
        // TODO validate data;
        UserDao.authenticateUser(req.body.email, req.body.password).then(token => {
            Util.sendSuccess(res, token);
        }).catch(next);
    }

    export async function comparePasswordToChange1(req: Request, res: Response, next: NextFunction) {
        // TODO validate data;
        UserDao.comparePasswordToChange(req.body.email, req.body.oldPassword).then(password => {
            // console.log(password);
            Util.sendSuccess(res, password);
        }).catch(next);
    }

    export async function isEmailExists(req: Request, res: Response) {
        // TODO validate data;
        const user = await UserDao.getUserByEmail(req.body.email);
        Util.sendSuccess(res, !!user);
    }

    export async function register(req: Request, res: Response, next: NextFunction) {
        // TODO validate data;
        const userData: DUser = req.body;
        await UserDao.createUser(userData).then((user) => {
            Util.sendSuccess(res, user);
        }).catch(next);

    }

    export function getSelf(req: Request, res: Response, next: NextFunction) {
        // noinspection TypeScriptUnresolvedVariable
        UserDao.getUserById(req.user._id).then(user => {
            Util.sendSuccess(res, user);
        }).catch(next);
    }

    export async function updateUser(req: Request, res: Response) {
        try {
            const user: DUser = req.body;
            const profile = await UserDao.updateUser(user.id, req.body);
            Util.sendSuccess(res, profile);
        } catch (e) {
            Util.sendError(res, e);
        }
    }

    export async function getAllUsers(req: Request, res: Response) {
        // TODO validate data;
        const users = await UserDao.getAllUsers();

        Util.sendSuccess(res, users, "All users returned");
    }

    export async function getProfile(req: Request, res: Response) {
        Util.sendSuccess(res, req.user);
    }

    export async function deleteUser(req: Request, res: Response) {
        // console.log(req.body.userId);
        let userDeleted = UserDao.deleteUser(req.body.userId);
        if (userDeleted) {
            Util.sendSuccess(res, "User Deleted!");
        } else {
            Util.sendError(res, "User Not Deleted");
        }
    }

    export async function getUserById(req: Request, res: Response) {
        // console.log("back" + req.body.id);
        let user = await UserDao.getUserById(req.body.id);
        // console.log(user);
        Util.sendSuccess(res, user, "user returned");
    }

    export async function changePassword(req: Request, res: Response) {
        // console.log("enpppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"+req.body.password);
        let user = await UserDao.changePassword(req.body);
        Util.sendSuccess(res, user, "Password Change");
    }
}
