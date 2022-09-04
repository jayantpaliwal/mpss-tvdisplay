import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public auth: CommonService, public router: Router) { }

  canActivate(): boolean {
    var islogin = localStorage.getItem("login");
    if (islogin == "true") {
   
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
