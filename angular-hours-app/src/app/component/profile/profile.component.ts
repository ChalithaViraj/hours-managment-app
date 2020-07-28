import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {IUser} from "../../models/user";
import {Router} from "@angular/router";
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('alert', {static: true}) alert: ElementRef;
  user: IUser;
  userEmail: string;
  oldPassword: string;
  newPassword: string;
  oldPasswordValidation: boolean;
  reNewPassword: string;
  passwordChangeMessageSuccess: boolean;
  passwordChangeMessageError: boolean;
  comparePasswordTextFields: boolean;
  modalColse: boolean = true;
  formFiledsValidation: boolean;
  loadingSpinner: boolean = false;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
  ) {
  }

  ngOnInit() {
    this.authservice.getProfile().subscribe(res => {
      // console.log(res);
      this.user = res.data;
      this.userEmail = res.data.email;
    });
  }

  profileUpdate() {

    // console.log(this.user.id);
    // console.log(this.oldPassword);
    // console.log(this.newPassword);
    // console.log(this.userEmail);
    this.comparePasswordToChange(this.userEmail, this.oldPassword);
  }

  comparePasswordToChange(email, oldPassword) {
    const user = {
      email,
      oldPassword,
    };
    this.authservice.comparePassword(user).subscribe(res => {
      // console.log(res);
      if (res.success) {
        if (this.formValidation()) {
          if (this.newPassword === this.reNewPassword) {
            this.oldPasswordValidation = false;
            this.user.password = this.reNewPassword;
            this.changePassword();
            console.log('update success');
          } else {
            this.comparePasswordTextFields = true;
          }
        } else {
          this.formFiledsValidation = true;
        }
      } else {
        this.oldPasswordValidation = true;
        console.log('Cant update');
      }
    });
  }

  changePassword() {
    this.loadingSpinner = true;
    this.authservice.changePassword(this.user).subscribe(res => {
      this.loadingSpinner = false;
      if (res.success) {
        localStorage.clear();
        this.passwordChangeMessageSuccess = true;
        this.modalColse = false;
      } else {
        this.passwordChangeMessageError = true;
      }
    });
  }

  closeUpdateModal() {
    this.router.navigate(['/']);
  }

  formValidation() {
    if (!this.newPassword) {
      return false;
    } else if (!this.reNewPassword) {
      return false;
    }
    return true;
  }

}
