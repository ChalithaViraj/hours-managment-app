import {NextFunction, Request, Response} from "express";
import {Util} from "../common/util";
import {ProjectDao} from "../dao/project-dao";
import {DProject} from "../models/project-model";


export namespace ProjectEp {

    // export async function isProjectExists(req: Request, res: Response) {
    //     // TODO validate data;
    //     const project = await ProjectDao.getProjectByName(req.body.name);
    //     Util.sendSuccess(res, !!project);
    // }

    export async function addProject(req: Request, res: Response, next: NextFunction) {
        // TODO validate data;
        const projectData: DProject = req.body;

        ProjectDao.addProject(projectData).then(project => {
            Util.sendSuccess(res, project);
        }).catch(next);
    }

    export async function getAllProject(req: Request, res: Response) {
        const project = await ProjectDao.getAllProject();
        Util.sendSuccess(res, project);
    }

    export async function updateProject(req: Request, res: Response) {
        try {
            const project: DProject = req.body;
            const profiledetails = await ProjectDao.updateProject(project._id, req.body);
            Util.sendSuccess(res, profiledetails);
        } catch (e) {
            Util.sendError(res, e);
        }
    }

    // export async function getProjectByName(req: Request, res: Response) {
    //     console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
    //     console.log(req.body);
    //     // const projectName:string = req.body.projectName;
    //     // const project = await ProjectDao.getProjectByName(projectName);
    //     // Util.sendSuccess(res, project);
    // }
}