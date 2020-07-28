import * as mongoose from "mongoose";

export interface DocFilterOptions {
    docType: string;
    docNbr: number;
    ranges?: {companyNbr?: string, year?: number}[];
}

export interface DDoc {
    docType: string;
    docNbr: number;
    ranges: DNbr[];
}

export interface IDoc extends mongoose.Document {
    docType: string;
    docNbr: number;
    ranges: INbr[];
}

export interface DNbr {
    companyNbr: string;
    year: number;
    dates: DNbrDate[];
}

export interface INbr extends mongoose.Document {
    companyNbr: string;
    year: number;
    dates: INbrDate[];
}

export interface DNbrDate {
    period: number;
    startDate: Date;
    endDate: Date;
}

export type INbrDate = DNbrDate & mongoose.Document;
