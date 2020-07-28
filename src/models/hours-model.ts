import * as mongoose from "mongoose";
import {ObjectIdOr, StringOrObjectId} from "../common/util";
import {IUser} from "./user-model";
import {IProject} from "./project-model";



interface CommonAttributes {
    hours: number;
    date: Date;
    note?: string;
}

export interface IHours extends CommonAttributes, mongoose.Document {
    user: ObjectIdOr<IUser>;
    project: ObjectIdOr<IProject>;
}

export interface DHours extends CommonAttributes {
    id?: StringOrObjectId;
    user: StringOrObjectId;
    project: StringOrObjectId;
}
