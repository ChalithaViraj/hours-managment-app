import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {IHour, DHour} from '../../models/hour-details-details';
import {Subject} from "rxjs/index";
import {IUser} from "../../models/user";
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {IProject} from "../../models/project";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  list: IHour[];
  hour: DHour;
  user: IUser;
  public filterData: any = {};
  userProjectList: string[] = [];
  allNamesAndHours: any[] = [];
  loadingSpinner: boolean = false;
  selectId: string;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<IUser> = new Subject();

  totalHours: number = 0;
  totalHoursArray: number[] = [];

  // Chart
  title = '';
  type = 'PieChart';
  data = [];
  columnNames = ['Project Name', 'Total Hours'];
  options = {};
  width = 550;
  height = 400;

  // Chart

  constructor(
    private authservice: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) {
  };

  async ngOnInit() {
    await this.getProfile();
    await this.getAllHoursDetails();
    await this.initialiseHour();
    // this.getAllHoursDetails();
  }

  getProfile() {
    this.authservice.getProfile().subscribe(res => {
      this.user = res.data;
    });
  }

  initialiseHour() {
    this.hour = {
      _id: '',
      user: '',
      project: '',
      hours: null,
      date: null,
      note: '',
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getAllHoursDetails() {
    this.authservice.getAllHoursDetails().subscribe(res => {
      // console.log(res);
      this.list = res.data.filter(hour => {
        return hour.user.id === this.user.id;
      });
      this.dtTrigger.next();
      this.getUserOfProject();
    });
  }

  removeHour(selectedHour, callback = () => {
    this.loadingSpinner = true;
    this.hour = selectedHour;
    this.selectId = selectedHour._id;
    // console.log(this.hour._id);
    this.authservice.deleteHour(this.hour._id).subscribe(res => {
      this.loadingSpinner = false;
      if (res.success) {
        this.flashMessage.show('Hour Record deleted Successfully!', {cssClass: 'alert-success', timeout: 3000});
        this.dtTrigger.unsubscribe();
        this.getAllHoursDetails();
      } else {
        this.flashMessage.show('Something went Wrong!', {cssClass: 'alert-success', timeout: 3000});
      }
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

  getUserOfProject() {
    for (const value of this.list) {
      // console.log(value.user.name);
      this.userProjectList.push(value.project.name);
    }
    this.userProjectList = this.userProjectList.filter((el, i, a) => i === a.indexOf(el));
    this.filterAndCount();
  }

  filterAndCount() {
    let countedNamesAndHours = this.list.reduce(function (allNames, entry) {
      if (entry.project.name in allNames) {
        allNames[entry.project.name] += entry.hours;
      }
      else {
        allNames[entry.project.name] = entry.hours;
      }
      return allNames;
    }, {});
    const obj = countedNamesAndHours;
    this.allNamesAndHours = Object.entries(obj);
    this.data = this.allNamesAndHours;
    console.log(Object.entries(obj));
  }

  projectClicked(clickedProject) {
    const project = this.list.find(projectName => {
      return (clickedProject[0] === projectName.project.name);
    });
    console.log(project.project._id);
    console.log(project.project.name);
    this.router.navigate(['project-analytic/', project.project._id, project.project.name]);
  }
}
