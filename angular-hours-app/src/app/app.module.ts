import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DatePickerModule} from '@syncfusion/ej2-angular-calendars';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ProfileComponent} from './component/profile/profile.component';
import {ReactiveFormsModule} from "@angular/forms";

import {AuthService} from './service/auth.service';
import {DataTablesModule} from 'angular-datatables';
import {AuthGuard} from './service/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './component/login/login.component';
import {FormsModule} from "@angular/forms";
import {FlashMessagesModule} from 'angular2-flash-messages';
import {HomeComponent} from './component/home/home.component';
import {WrongRouteComponent} from './component/wrong-route/wrong-route.component';
import {UserDetailsComponent} from './component/user-details/user-details.component';
import {ProjectDetailsComponent} from './component/project-details/project-details.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProjectAnalyticComponent } from './component/project-analytic/project-analytic.component';
import { UserAnalyticComponent } from './component/user-analytic/user-analytic.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const applicationRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},

  {path: 'user-details', component: UserDetailsComponent},
  {path: 'project-details', component: ProjectDetailsComponent},
  {path: 'project-analytic/:id/:name', component: ProjectAnalyticComponent},
  {path: 'user-analytic/:id/:name', component: UserAnalyticComponent},
  {path: '**', component: WrongRouteComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent,
    WrongRouteComponent,
    UserDetailsComponent,
    ProjectDetailsComponent,
    ProjectAnalyticComponent,
    UserAnalyticComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(applicationRoutes),
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    DatePickerModule,
    DataTablesModule,
    MDBBootstrapModule.forRoot(),
    GoogleChartsModule.forRoot(),
    SweetAlert2Module.forRoot()

  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule {
}
