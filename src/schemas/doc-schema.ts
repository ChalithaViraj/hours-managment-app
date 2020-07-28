import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {schemaOptions} from "../config";
import {IDoc} from "../models/doc-model";

export const nbrDateSchema = new mongoose.Schema({
    period: {
        type: Schema.Types.Number,
        required: true,
    },
    startDate: {
        type: Schema.Types.Date,
        required: true,
    },
    endDate: {
        type: Schema.Types.Date,
        required: true,
    },
}, schemaOptions);

export const nbrSchema = new mongoose.Schema({
    companyNbr: {
        type: Schema.Types.String,
        required: false,
    },
    year: {
        type: Schema.Types.Number,
        required: true,
    },
    dates: [{
        type: nbrDateSchema,
        required: true,
        default: [],
    }],
}, schemaOptions);

export const docSchema = new mongoose.Schema({
    docType: {
        type: Schema.Types.String,
        required: false,
    },
    docNbr: {
        type: Schema.Types.Number,
        required: true,
    },
    ranges: [{
        type: nbrSchema,
        required: true,
        default: [],
    }],
}, schemaOptions);

const Doc = mongoose.model<IDoc>('Doc', docSchema);
export default Doc;
