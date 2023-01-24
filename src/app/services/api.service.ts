import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = "https://localhost:7141/api/Users/"
  private setAdmUrl: string = "https://localhost:7141/api/Users/setadmin"

  constructor(private http: HttpClient) {}


  getUsers() {
    return this.http.get<any>(this.baseUrl + "getallusersinfo");
  }

  getUserById() {
    return this.http.get<any>(this.baseUrl + "")
  }

  DeleteUserById(userId : any) {
    return this.http.delete<any>("https://localhost:7141/api/Users/delete/"+userId);
  }

  UpdateUser(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}update`, userObj)
  }

  

}


// .pipe(map((res:any)=>{
//   return res;
// }))