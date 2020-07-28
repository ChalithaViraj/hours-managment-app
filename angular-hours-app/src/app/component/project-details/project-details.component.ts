import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {DProject, IProject} from "../../models/project";
import {Subject} from "rxjs/index";
import {IUser} from "../../models/user";
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from "@angular/router";
import {IHour} from "../../models/hour-details-details";
import Swal from "sweetalert2";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  list: IProject[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<IUser> = new Subject();
  project: DProject;
  errorMessage: boolean;
  saveError: boolean;
  saveSuccess: boolean;
  updateSuccess: boolean;
  updateError: boolean;
  getProject: IProject;
  popupMode: string = "save";
  projectNameList: string[] = [];
  allHourDetailList: IHour[];
  loadingSpinner: boolean = false;
  loadingSpinnerForRemove: boolean = false;
  constructor(
    private authservice: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getAllProjects();
    this.initialiseProject();
  }

  initialiseProject() {
    this.project = {
      name: '',
      client: '',
      active: true
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  newProject() {
    this.popupMode = "save";
  }

  formFiledValidation() {
    if (this.project.name === '') {
      return true;
    } else if (this.project.client === '') {
      return true;
    }
    return false;
  }

  getAllProjects() {
    this.authservice.getAllProjectDetails().subscribe(res => {
      // console.log(res);
      this.list = res.data;
      this.dtTrigger.next();
      this.getProjectName();
    });
  }

  saveProject(newProject: DProject) {
    if (this.formFiledValidation()) {
      this.errorMessage = true;
    } else {
      this.loadingSpinner = true;
      newProject = this.project;
      // console.log(newProject);
      this.authservice.saveNewProject(newProject).subscribe(res => {
          this.loadingSpinner = false;
          if (res.success) {
            this.saveSuccess = true;
            this.dtTrigger.unsubscribe();
            this.getAllProjects();
          } else {
            this.saveError = true;
          }
        }
      );
    }
  }

  getProjectForEdit(selectedProject) {
    // this.project = Object.assign({}, selectedProject);
    this.project = selectedProject;
    this.popupMode = "edit";
  }

  updateProject() {
    this.loadingSpinner = true;
    console.log('clicked');
    this.authservice.updateProject(this.project).subscribe(res => {
      this.loadingSpinner = false;
      if (res.success) {
        this.updateSuccess = true;
        this.dtTrigger.unsubscribe();
        this.getAllProjects();
      } else {
        this.updateError = true;
      }
    });
  }

  projectRemove(selectedProject, callback = () => {
    this.project = selectedProject;
    console.log(this.project._id);
    this.project.active = false;
    this.loadingSpinnerForRemove = true;
    this.authservice.updateProject(this.project).subscribe(res => {
      this.loadingSpinnerForRemove = false;
      // this.project = null;
      if (res.success) {
        this.flashMessage.show('Project Remove Success', {cssClass: 'alert-success', timeout: 3000});
        this.dtTrigger.unsubscribe();
        this.getAllProjects();
        this.project = {name: '', client: '', active: true};
      } else {
        this.flashMessage.show('Something went Wrong!', {cssClass: 'alert-success', timeout: 3000});
        this.project = {name: '', client: '', active: true};
      }
      // console.log(res);
    });
  }) {
    Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        );
        return callback();
      }
    });
  }

  analytic(selectedProject) {
    this.project = selectedProject;
    this.router.navigate(['project-analytic/', this.project._id, this.project.name]);
  }

  getProjectName() {
    for (const value of this.list) {
      // console.log(value.user.name);
      this.projectNameList.push(value.name);
    }
    console.log(this.projectNameList);
    this.getAllHoursDetails();
  }

  getAllHoursDetails() {
    this.authservice.getAllHoursDetails().subscribe(res => {
      this.allHourDetailList = res.data;
      console.log(this.allHourDetailList);
      this.getTotalHoursOfUsers();
    });
  }

  totalHours: number = 0;
  totalHoursArray: number[] = [];

  getTotalHoursOfUsers() {
    for (const projectNames of this.projectNameList) {
      this.totalHours = 0;
      this.allHourDetailList.forEach(hours => {
        if (hours.project.name == projectNames) {
          this.totalHours = this.totalHours + hours.hours;
        }
      });
      this.totalHoursArray.push(this.totalHours);
    }
    ;
    console.log("total hours" + this.totalHoursArray);
  }

  closeButton() {
    this.project = {name: '', client: '', active: true};
    this.updateError = false;
    this.updateSuccess = false;
    this.saveSuccess = false;
    this.saveError = false;
    this.errorMessage = false;
    this.dtTrigger.unsubscribe();
    this.getAllProjects();
  }
}
