import { HttpClient, HttpResponse } from '@angular/common/http';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Config } from '@fortawesome/fontawesome-svg-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private baseUrl: string = "https://localhost:7141/api/Users/";
  private userPayload: any;
  constructor(private http : HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
    
  }

  register(userObj : any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj)

  }


  //    .pipe(map((res:any)=>{
  //  return res;
  login(userObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, userObj).pipe(map((err:any)=>err))
  }


  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['welcome']);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  storeUsername(currentUser: string){
    localStorage.setItem('username', currentUser)
  }

  getId(){
    if (this.userPayload) {
      return this.userPayload.nameid
    }
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getFirstNameFromToken(){
    const firstName = this.userPayload.unique_name.split(' ')[0]
    if(this.userPayload)
      return firstName;
    return this.userPayload.unique_name;

  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

}
