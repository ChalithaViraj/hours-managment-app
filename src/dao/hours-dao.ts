import {DHours, IHours} from "../models/hours-model";
import Hours from "../schemas/hours-schemas";
import {AppLogger} from "../common/logging";
import {Promise} from "mongoose";
import {StringOrObjectId} from "../common/util";


export namespace HoursDao {

    const populateOptions = [
        "user",
        "project"
    ];

    export async function addHours(data: DHours): Promise<IHours> {
        const hour: IHours = new Hours(data);
        AppLogger.info(`New User created, hourID: ${hour.id}`);
        await hour.save();
        return hour;
    }

    export async function getAllHouersDetails(): Promise<IHours []> {
        const hours = await Hours.find().sort({date:-1}).populate(populateOptions);
        AppLogger.info(`get All Hours Details`);
        return hours;
    }

    export async function deletehour(id: StringOrObjectId): Promise<IHours> {
        AppLogger.info(`Hour deleted by ID ${id}`);
        return Hours.findByIdAndRemove(id);
    }

    export async function getProjectHourDetailsById(id:string): Promise<IHours []> {
        const hours = await Hours.find({project:id}).sort({date:-1}).populate(populateOptions);
        AppLogger.info(`get All Hours Details`);
        return hours;
    }

    export async function getUserHourDetailsById(id:string): Promise<IHours []> {
        const hours = await Hours.find({user:id}).sort({date:-1}).populate(populateOptions);
        AppLogger.info(`get All Hours Details`);
        return hours;
    }
}