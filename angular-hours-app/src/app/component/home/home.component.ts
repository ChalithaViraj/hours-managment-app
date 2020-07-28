import {Component, OnInit} from '@angular/core';
import {IUser} from "../../models/user";
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IProject} from "../../models/project";
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from "@angular/router";
import {IHour, DHour} from "../../models/hour-details-details";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: IUser;
  projects: IProject[];
  hours: number;
  selectedProjectName: string = '';
  note: string;
  showOrNot: boolean;
  loadingSpinner: boolean = false;

  dateValue: Date = new Date();

  constructor(
    private authservice: AuthService,
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.authservice.getProfile().subscribe(res => {
      // console.log(res);
      this.user = res.data;
    });

    this.authservice.getAllProjectDetails().subscribe(res => {
      // console.log(res);

      this.projects = res.data;
      // console.log(this.projects);
    });
    this.isAdmin();
  }


  selectChangeHandler(event: any) {
    // update the ui
    this.selectedProjectName = event.target.value;
  }

  formFiledValidation() {
    if (this.hours === undefined) {
      return true;
    } else if (this.selectedProjectName === '') {
      return true;
    }
    return false;
  }

  hoursValidation(hours) {
    console.log("from function" + this.hours);
    if (/^[0-9]*$/.test(hours)) {
      return (true);
    }
    return (false);
  }

  addHoursData() {

    if (this.formFiledValidation()) {
      this.flashMessage.show('Please Provide Project Name and Hours', {cssClass: 'alert-warning', timeout: 3000},);
    } else {
      if (!this.hoursValidation(this.hours)) {
        console.log(this.hours);
        this.flashMessage.show('Please Use Numbers For the Hours Filed', {cssClass: 'alert-warning', timeout: 3000},);
      } else {
        const hourDetail: DHour = {
          user: this.user.id,
          project: this.selectedProjectName,
          hours: this.hours,
          date: this.dateValue,
          note: this.note,
        };
        this.loadingSpinner = true;
        this.authservice.addAllHoursData(hourDetail).subscribe(res => {
          this.loadingSpinner = false;
          if (res.success) {
            this.flashMessage.show('Hour Details added Successfully!', {cssClass: 'alert-success', timeout: 3000});
            this.router.navigate(['dashboard']);
          } else {
            this.flashMessage.show('Something went Wrong!', {cssClass: 'alert-success', timeout: 3000});
          }
        });
      }
    }
  }

  isAdmin() {
    this.authservice.getProfile().subscribe(res => {
      if (res.data.role == 'admin') {
        this.showOrNot = true;
      } else {
        this.showOrNot = false;
      }
    });
  }

  userDetailsClick() {
    this.router.navigate(['user-details']);
  }

  projectDetailsClick() {
    this.router.navigate(['project-details']);
  }
}
