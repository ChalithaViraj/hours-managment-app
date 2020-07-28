import * as mongoose from "mongoose";
import {StringOrObjectId} from "../common/util";


interface CommonAttributes {
    name: string;
    email: string;
    password: string;
    number: string;
    role: string;
    active: boolean;
}

export interface DUser extends CommonAttributes {
    id?: StringOrObjectId;
}

export interface IUser extends CommonAttributes, mongoose.Document {

    createAccessToken(): string;

    comparePassword(password: string): Promise<boolean>;
}
