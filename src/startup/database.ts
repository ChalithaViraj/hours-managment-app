// import * as mongoose from 'mongoose';
// import {Schema} from "mongoose";

// const object = Schema.Types.ObjectId;
// object.prototype.get();

// mongoose.SchemaTypes.ObjectId.prototype.get((v: any) => v.toString());

const mongoose = require('mongoose');

mongoose.ObjectId.get((v: any) => v ? v.toString() : v);

export default async function databaseSetup() {
    await mongoose.connect(process.env.MONGOOSE_URI, {
        useNewUrlParser: true,
    });
}
