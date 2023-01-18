import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterState, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private toast: NgToastService) {

  }
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
    return true;
    }else{
      this.toast.error({detail: "ERROR", summary: "You need to login first!" });
      this.router.navigate(['login']);
      return false;
    }
  }

  // checkAdmin():boolean{
  //   if(this.auth.isAdmin()){
  //   return true;
  //   }else{
  //     this.toast.error({detail: "ERROR", summary: "You need to login as admin!" });
  //     this.router.navigate(['welcome']);
  //     return false;
  //   }
  }


