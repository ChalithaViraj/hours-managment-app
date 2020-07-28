import {Express} from 'express';
import {UserEp} from "../end-points/user-ep";
import {ProjectEp} from "../end-points/project-ep";
import {HoursEp} from "../end-points/hours-ep";

export function initAuthRoutes(app: Express) {

    /* AUTH ROUTES */
    app.get('/api/auth/user', UserEp.getSelf);
    // app.post('/api/auth/common/user/update', UserEp.updateUser);
    app.post('/api/auth/user/update-user', UserEp.updateUser);
    app.get('/api/auth/user/get-profile', UserEp.getProfile);
    app.post('/api/auth/user/add-hours', HoursEp.addHours);
    app.post('/api/auth/user/get-user', UserEp.getUserById);
    app.post('/api/auth/user/delete-hour', HoursEp.deleteHour);
    app.post('/api/auth/user/project-hour-detail', HoursEp.getProjectHourDetailsById);
    app.post('/api/auth/user/compare-password', UserEp.comparePasswordToChange1);
    app.post('/api/auth/user/change-password', UserEp.changePassword);
    // app.post('/api/auth/user/project-by-name', ProjectEp.getProjectByName);

    /* ADMIN ROUTES */
    app.get('/api/auth/admin/get-all-users', UserEp.getAllUsers);
    app.post('/api/auth/admin/register', UserEp.register);
    app.post('/api/auth/admin/delete-user', UserEp.deleteUser);
    // app.post('/api/auth/admin/update-user', UserEp.updateUser);
    app.post('/api/auth/admin/add-project', ProjectEp.addProject);
    app.post('/api/auth/admin/update-project', ProjectEp.updateProject);
    app.post('/api/auth/admin/user-hour-detail', HoursEp.getUserHourDetailsById);

    /* PUBLIC ROUTES */
    app.post('/api/public/login', UserEp.authenticate);
    app.post('/api/public/email-exists', UserEp.isEmailExists);
    app.post('/api/public/add-project', ProjectEp.addProject);
    app.get('/api/public/get-hours', HoursEp.getAllHourseDetails);
    app.get('/api/public/get-project', ProjectEp.getAllProject);

    // app.post('/api/public/delete-user', UserEp.deleteUser);
}
