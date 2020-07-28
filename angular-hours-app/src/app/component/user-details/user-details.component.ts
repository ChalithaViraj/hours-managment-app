import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {IUser} from "../../models/user";
import {Subject} from 'rxjs';
import 'datatables.net';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],

})
export class UserDetailsComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  list: IUser[] = [];
  user: IUser;
  dtTrigger: Subject<IUser> = new Subject();
  errorMessage: boolean;
  saveSuccess: boolean;
  saveError: boolean;
  popupMode: string = "save";
  updateSuccess: boolean;
  emailValidation: boolean;
  loadingSpinner: boolean = false;
  loadingSpinnerForRemove: boolean = false;
  isEmailExists: boolean = false;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getAllUser();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.initialiseUser();
  }

  initialiseUser() {
    this.user = {
      name: '',
      email: '',
      number: null,
      role: '',
      password: '',
      active: true
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true);
    }
    return (false);
  }

  getAllUser() {
    this.authService.getAllUsers().subscribe(res => {
      //console.log(res);
      this.list = res.data;
      this.dtTrigger.next();
    });
  }

  formFiledValidation() {
    if (this.user.name === '') {
      return true;
    } else if (this.user.email === '') {
      return true;
    } else if (this.user.password === '') {
      return true;
    } else if (this.user.number === null) {
      return true;
    } else if (this.user.role === '') {
      return true;
    }
    return false;
  }

  // emailValidation() {
  //
  // }

  resetForm() {
    this.initialiseUser();
    this.errorMessage = false;
    this.saveSuccess = false;
    this.saveError = false;
    this.updateSuccess = false;
    this.emailValidation = false;
    this.isEmailExists = false;
    this.dtTrigger.unsubscribe();
    this.getAllUser();
  }

  success() {
    this.errorMessage = false;
    this.saveError = false;
    this.emailValidation = false;
  }

  timeOut(){
    setTimeout(()=>{
      this.isEmailExists = false;
      this.errorMessage = false;
      this.saveError = false;
      this.emailValidation = false;
      this.isEmailExists = false;
    }, 3000);

  }

  // new user save
  saveUser(newUser: IUser) {
    if (this.formFiledValidation()) {
      this.errorMessage = true;
      this.timeOut();
    } else {
      if (this.validateEmail(this.user.email)) {
        this.loadingSpinner = true;
        this.timeOut();
        newUser = this.user;
        this.authService.saveNewUser(newUser).subscribe(res => {
          this.loadingSpinner = false;
          console.log(res);
          if (res.success) {
            this.saveSuccess = true;
            this.dtTrigger.unsubscribe();
            this.getAllUser();
            this.success();
            // console.log("from regex" + this.validateEmail(this.user.email));
          } else {
            this.loadingSpinner = false;
            this.isEmailExists = true;
            this.timeOut();
          }
        });
      } else {
        this.emailValidation = true;
        this.timeOut();
      }
    }
  }

  newUser() {
    this.popupMode = "save";
  }

  removeUser(selectedProject, callback = () => {
    this.user = selectedProject;
    console.log(this.user.id);
    this.user.active = false;
    this.loadingSpinnerForRemove = true;
    this.authService.updateUser(this.user).subscribe(res => {
      this.loadingSpinnerForRemove = false;
      if (res.success) {
        this.flashMessage.show('User Removed Successfully', {cssClass: 'alert-success', timeout: 3000});
        this.dtTrigger.unsubscribe();
        this.getAllUser();
        this.initialiseUser();
      } else {
        this.flashMessage.show('Something went Wrong!', {cssClass: 'alert-success', timeout: 3000});
        this.initialiseUser();
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

  getUserForedit(selectUser: IUser) {
    this.popupMode = "edit";
    this.user = selectUser;
  }

  updateUser(user: IUser) {
    if (this.formFiledValidation()) {
      this.errorMessage = true;
      this.timeOut();
    } else {
      if (this.validateEmail(this.user.email)) {
        this.loadingSpinner = true;
        this.authService.updateUser(this.user).subscribe(res => {
            this.loadingSpinner = false;
            if (res.success) {
              this.updateSuccess = true;
              this.dtTrigger.unsubscribe();
              this.getAllUser();
              this.success();
            } else {
              this.updateSuccess = false;
            }
          }
        );
      } else {
        this.emailValidation = true;
        this.timeOut();
      }
    }
  }

  analytic(selectedUser) {
    this.user = selectedUser;
    console.log(this.user.id);
    this.router.navigate(['/user-analytic', this.user.id, this.user.name]);
  }
}
