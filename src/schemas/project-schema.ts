import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {IProject} from "../models/project-model";

export const projectSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    client: {
        type: Schema.Types.String,
        unique: true,
        required: true,
    },
    active: {
        type: Schema.Types.Boolean,
        unique: true,
        required: true,
    }
});

const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;