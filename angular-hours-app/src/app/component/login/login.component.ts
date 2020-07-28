import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from "@angular/router";
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;
  token = this.authservice.getToken();

  constructor(
    private authservice: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {
  }

  ngOnInit() {
    if (this.token) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
  }

  loginUser() {
    const user = {
      email: this.email,
      password: this.password
    };
    this.authservice.loginUser(user).subscribe(res => {
        if (res.success) {
          // console.log(res);
          this.authservice.storeToken(res.data);
          this.flashMessage.show('Login success', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/home']);
        } else {
          // console.log(res);
          this.flashMessage.show(res.error, {cssClass: 'alert-danger', timeout: 3000});
        }
      }
    );
  }
}
