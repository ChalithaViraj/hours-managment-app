import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppResponse} from '../models/responce';
import {DHour, IHour} from "../models/hour-details-details";
import {JwtHelperService} from "@auth0/angular-jwt";
import {DProject, IProject} from "../models/project";
import {IUser} from "../models/user";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;

  constructor(
    private http: HttpClient
  ) {
  }

  getAllHoursDetails() {
    let headers = new HttpHeaders();
    return this.http.get<AppResponse<IHour[]>>(environment.apiUrl+'/api/public/get-hours', {headers: headers});
  }

  getAllProjectDetails() {
    let headers = new HttpHeaders();
    // return this.http.get<AppResponse<IProject[]>>('http://localhost:3006/api/public/get-project', {headers: headers});
    return this.http.get<any>(environment.apiUrl+'/api/public/get-project', {headers: headers});
  }

  // getProjectByName(projectName) {
  //   console.log("auth " + projectName);
  //   this.loadToken();
  //   let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
  //   return this.http.post<any>('http://localhost:3006/api/auth/user/project-by-name', {projectName: projectName}, {headers: headers});
  // }

  saveNewProject(project: DProject) {
    console.log("auth" + project);
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/admin/add-project', project, {headers: headers});
  }

  updateProject(project: DProject) {
    console.log("auth" + project._id);
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/admin/update-project', project, {headers: headers});
  }

  getAllUsers() {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.get<any>(environment.apiUrl+'/api/auth/admin/get-all-users', {headers: headers});
  }

  loginUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/public/login', user, {headers: headers});
  }

  comparePassword(user) {
    // console.log("auth "+user.email);
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/user/compare-password', user, {headers: headers});
  }

  changePassword(user) {
    // console.log("auth " + user.name);
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/user/change-password', user, {headers: headers});
  }

  storeToken(token) {
    localStorage.setItem("tokenId", token);
    this.authToken = token;
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.get<any>(environment.apiUrl+'/api/auth/user/get-profile', {headers: headers});
  }

  addAllHoursData(hoursDetails: DHour) {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/user/add-hours', hoursDetails, {headers: headers});
  }

  deleteHour(hourId: string) {
    console.log("auth" + hourId);
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/user/delete-hour', {hourId: hourId}, {headers: headers});
  }

  getProjectHourDetalisById(hourProjectId: string) {
    // console.log("auth" + hourProjectId);
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/user/project-hour-detail', {hourProjectId: hourProjectId}, {headers: headers});
  }

  getUserHourDetalisById(hourUserId: string) {
    // console.log("auth" + hourUserId);
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/admin/user-hour-detail', {hourUserId: hourUserId}, {headers: headers});
  }

  saveNewUser(user: IUser) {
    // console.log(user);
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/admin/register', user, {headers: headers});
    // console.log(user);
  }

  deleteUser(userId: string) {
    // console.log("auth" + userId);
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/admin/delete-user', {userId: userId}, {headers: headers});
  }

  userGetById(getUserById: string) {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/user/get-user', {id: getUserById}, {headers: headers});
  }

  updateUser(user: IUser) {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.authToken).append('Content-Type', 'application/json');
    return this.http.post<any>(environment.apiUrl+'/api/auth/user/update-user', user, {headers: headers});
  }

  loadToken() {
    const token = localStorage.getItem('tokenId');
    this.authToken = token;

  }

  getToken() { // this function using for check user logged or logout in loginComponent
    const token = localStorage.getItem('tokenId');
    if (token == this.authToken) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    //this.authToken = null;
    localStorage.clear();
    this.authToken = null;
  }

  helper = new JwtHelperService();

  loggedIn() {
    this.loadToken();
    return !this.helper.isTokenExpired(this.authToken);
  }
}
