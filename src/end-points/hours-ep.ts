import {NextFunction, Request, Response} from "express";
import {Util} from "../common/util";
import {HoursDao} from "../dao/hours-dao";
import {DHours} from "../models/hours-model";


export namespace HoursEp{
    export async function addHours(req: Request, res: Response) {
        //console.log(req)
        // TODO validate data;
        const hoursData: DHours = req.body;

        const hours = await HoursDao.addHours(hoursData);
        Util.sendSuccess(res, hours);
    }

    export async function getAllHourseDetails(req: Request, res: Response) {
        // TODO validate data;
        const hours = await HoursDao.getAllHouersDetails();
        Util.sendSuccess(res, hours);
    }

    export async function deleteHour(req: Request, res: Response) {
        // console.log(req.body.userId);
        let hourDeleted = HoursDao.deletehour(req.body.hourId);
        if(hourDeleted){
            Util.sendSuccess(res,  "Hour Deleted!");
        } else {
            Util.sendError(res, "Hour Not Deleted");
        }
    }

    export async function getProjectHourDetailsById(req: Request, res: Response) {
        // TODO validate data;
        const hours = await HoursDao.getProjectHourDetailsById(req.body.hourProjectId);
        Util.sendSuccess(res, hours);
    }

    export async function getUserHourDetailsById(req: Request, res: Response) {
        // TODO validate data;
        const hours = await HoursDao.getUserHourDetailsById(req.body.hourUserId);
        Util.sendSuccess(res, hours);
    }
}
