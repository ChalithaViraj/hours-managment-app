import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Subject} from "rxjs/index";
import {IUser} from "../../models/user";
import {IHour} from "../../models/hour-details-details";

@Component({
  selector: 'app-user-analytic',
  templateUrl: './user-analytic.component.html',
  styleUrls: ['./user-analytic.component.css']
})
export class UserAnalyticComponent implements OnInit {

  userId: string;
  userName: string;
  list: IHour[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<IUser> = new Subject();
  allNamesAndHours:any[] = [];

  // Chart
  title = 'Working Project Details';
  type = 'PieChart';
  data = [];
  columnNames = ['Project Name', 'Total Hours'];
  options = {};
  width = 550;
  height = 450;

  // Chart

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.userId = id;
    let name = this.route.snapshot.paramMap.get('name');
    this.userName = name;
    console.log("map" + id);
    this.getUserHourDetalisById();
  }

  getUserHourDetalisById() {
    this.authService.getUserHourDetalisById(this.userId).subscribe(res => {
      console.log(res);
      this.list = res.data;
      this.dtTrigger.next();
      this.filterAndCount();
    });
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
    this.allNamesAndHours = Object.entries(obj)
    this.data = this.allNamesAndHours;
    console.log(Object.entries(obj));
  }
}
