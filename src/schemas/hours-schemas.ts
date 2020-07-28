import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {IHours} from "../models/hours-model";
import User from "./user-schema";
import Project from "./project-schema";

export const hoursSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User.modelName,
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: Project.modelName,
        required: true,
    },
    hours: {
        type: Schema.Types.Number,
        required: true,
    },
    date: {
        type: Schema.Types.Date,
        required: true,
    },
    note: {
        type: Schema.Types.String,
        required: false,
    }
});

const Hours = mongoose.model<IHours>('Hours', hoursSchema);
export default Hours;