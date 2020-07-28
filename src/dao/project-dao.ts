import {AppLogger} from "../common/logging";
import {ApplicationError} from "../common/application-error";
import {StringOrObjectId} from "../common/util";
import {DProject, IProject} from "../models/project-model";
import Project from "../schemas/project-schema";
import {Promise} from "mongoose";


export namespace ProjectDao {

    const populateOptions: any = [];


    export async function addProject(data: DProject): Promise<IProject> {
        const existingProject = await getProjectByName(data.name);
        if (existingProject) {
            throw new ApplicationError("Project Already Added");
        }
        const project = new Project(data);
        AppLogger.info(`New Project added, projectID: ${project.id}`);
        await project.save();
        return project;
    }

    export async function getProjectByName(name: string): Promise<IProject | null> {
        let project: IProject = await Project.findOne({name: name}).populate(populateOptions);
        AppLogger.info(`Got user for email, projectID: ${project ? project.name : "None"}`);
        return project;
    }

    export async function getAllProject(): Promise<IProject []> {
        const project = await Project.find({active:true});
        AppLogger.info(`Got All project`);
        return project;
    }

    export async function updateProject(id: StringOrObjectId, data: Partial<DProject>): Promise<IProject> {
        await Project.findByIdAndUpdate(id, data);
        AppLogger.info(`Updated user by ID ${id}`);
        return getProjectById(id);
    }

    export async function getProjectById(id: StringOrObjectId): Promise<IProject> {
        let project: IProject = await Project.findById(id);
        if (!project) {
            throw new ApplicationError("Project not found for Id: " + id);
        }
        AppLogger.info(`Got user for id, userID: ${project}`);
        return project;
    }
}
