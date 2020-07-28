import {ProjectDao} from "../dao/project-dao";
import {DProject} from "../models/project-model";

export default async function seedProject() {
    const project: DProject = {
        name: `project2`,
        client: "client2",
        active: true,
    };
    let project1;
    try {
        project1 = await createProject(project);
    } catch (e) {
        console.log(e);
    }
    return [project1];
}

async function createProject(project: DProject) {
    return await ProjectDao.addProject(project);
}
