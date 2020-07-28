import * as mongoose from "mongoose";
import {StringOrObjectId} from "../common/util";

interface CommonAttributes {
    name: string;
    client: string;
    active:boolean;
}

export interface IProject extends CommonAttributes, mongoose.Document {}

export interface DProject extends CommonAttributes {
    _id?: StringOrObjectId;
}
