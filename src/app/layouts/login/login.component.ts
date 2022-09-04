import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { ReturnUrlsService } from '../../service/return-urls.service';
declare const swal;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  public _logindetail: any;//To store login detail throughout the application
  isLogInRestricted = false;
  loginFailText = false;
  @Input() error: string | null;
  constructor(private router: Router, private login: ReturnUrlsService) { }

  ngOnInit(): void {
  }

  public setlogindetail(details: any)
  {
    this._logindetail = details;
  }

  public getlogindetail(): any
  {
    return this._logindetail;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.login.loginDetails(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        res => {
          if(res['message']=='Wrong username or password.' || res['success']==false)
          {
            swal({
              title: "Login Failed",
              text: "Wrong Username or Password",
              icon: "error"
            })
          }
          else
          {
            localStorage.setItem("login","true");
            this.setlogindetail(res);
            localStorage.setItem("details",JSON.stringify(res))
            this.router.navigateByUrl('/admin-layout/dashboard');
          }
        },
        err => {
          swal({
            title: "Login Failed",
            text: "Wrong Username or Password",
            icon: "error"
          })
        }
      );

    }
  }
}
