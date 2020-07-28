import {Response} from "express";
import {ErrorLogger} from "./logging";
import * as mongoose from "mongoose";

export type ObjectIdOr<T extends mongoose.Document> = mongoose.Types.ObjectId | T;

export type StringOrObjectId = string | mongoose.Types.ObjectId;

export namespace Util {

    export function sendSuccess(res: Response, data: any, message?: any) {
        res.send({success: true, data: data, message: message});
    }

    export function sendError(res: Response, error: any, errorCode = 0) {
        if (typeof error === 'string') {
            res.send({success: false, error: error, errorCode: errorCode});
        } else {
            if (!error) {
                error = {stack: null, message: "Unknown Error"};
            }
            ErrorLogger.error(error.stack);
            res.send({success: false, data: error, message: error.message, errorCode: errorCode});
        }
    }
}
