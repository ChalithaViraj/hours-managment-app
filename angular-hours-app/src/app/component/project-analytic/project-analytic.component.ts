import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Subject} from "rxjs/index";
import {IUser} from "../../models/user";
import {IHour} from "../../models/hour-details-details";

@Component({
  selector: 'app-project-analytic',
  templateUrl: './project-analytic.component.html',
  styleUrls: ['./project-analytic.component.css']
})
export class ProjectAnalyticComponent implements OnInit {

  projectId: string;
  projectName: string;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<IUser> = new Subject();
  list: IHour[];
  projectUserList: string[] = [];
  grandTotal: number = 0;
  allNamesAndHours:any[] = [];

  // Chart
  title = 'User Hours Details';
  type = 'PieChart';
  data = [];
  columnNames = ['User Names', 'Total Hours'];
  options = {};
  width = 550;
  height = 400;

  // Chart

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
    let name = this.route.snapshot.paramMap.get('name');
    this.projectName = name;
    this.projectId = id;
    this.getProjectHourDetailsById();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getProjectHourDetailsById() {
    // console.log("byid" + this.projectId);
    this.authService.getProjectHourDetalisById(this.projectId).subscribe(res => {
      console.log(res);
      this.list = res.data;
      this.dtTrigger.next();
      this.getUserOfProject();
    });
  }

  getUserOfProject() {
    for (const value of this.list) {
      // console.log(value.user.name);
      this.projectUserList.push(value.user.name);
    }
    this.projectUserList = this.projectUserList.filter((el, i, a) => i === a.indexOf(el));
    console.log(this.projectUserList);
    this.getTotalHoursOfUsers();
  }

  totalHours: number = 0;
  totalHoursArray: number[] = [];

  getTotalHoursOfUsers() {
    for (const userName of this.projectUserList) {
      this.totalHours = 0;
      this.list.forEach(hours => {
        if (hours.user.name == userName) {
          // tot = tot + hours.hours;
          this.totalHours = this.totalHours + hours.hours;
        }
      });
      this.totalHoursArray.push(this.totalHours);
    }
    ;
    console.log("total hours" + this.totalHoursArray);
    this.finalTotalOfHours();
  }

  finalTotalOfHours() {
    for (const totalHours of this.totalHoursArray) {
      this.grandTotal = this.grandTotal + totalHours;
    }
    this.filterAndCount();
  }

  filterAndCount() {
    let countedNamesAndHours = this.list.reduce(function (allNames, entry) {
      if (entry.user.name in allNames) {
        allNames[entry.user.name] += entry.hours;
      }
      else {
        allNames[entry.user.name] = entry.hours;
      }
      return allNames;
    }, {});
    const obj = countedNamesAndHours;
    this.allNamesAndHours = Object.entries(obj)
    this.data = this.allNamesAndHours;
    console.log(Object.entries(obj));

  }
}
