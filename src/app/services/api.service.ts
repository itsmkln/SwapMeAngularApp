import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = "https://localhost:7141/api/Users/"
  private userUrl: string = "https://localhost:7141/api/Users/getallusersinfo"
  private setAdmUrl: string = "https://localhost:7141/api/Users/setadmin"


  constructor(private http: HttpClient) {}


  getUsers() {
    return this.http.get<any>(this.userUrl);
  }

  DeleteMe(username : string) {
    return this.http.delete<any>("https://localhost:7141/api/Users/deleteme/"+username)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
