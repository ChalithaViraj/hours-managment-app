import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import * as bcrypt from 'bcryptjs';
import {IUser} from "../models/user-model";

const jwt = require('jsonwebtoken');


export const userSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    number: {
        type: Schema.Types.Number,
        required: true,
    },
    role: {
        type: Schema.Types.String,
        required: true,
    },
    active: {
        type: Schema.Types.Boolean,
        required: true,
    }
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.password;
        }
    },
});


userSchema.pre('save', function (next) {
    const user: any = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    // noinspection JSIgnoredPromiseFromCall
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        // noinspection JSIgnoredPromiseFromCall
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.createAccessToken = function (this: IUser) {
    return jwt.sign({user_id: this.id}, process.env.JWT_SECRET);
};

userSchema.methods.comparePassword = function (password: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // noinspection JSIgnoredPromiseFromCall
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) {
                return reject(err);
            }
            return resolve(isMatch);
        });
    });
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
