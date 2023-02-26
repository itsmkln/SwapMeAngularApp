import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = "https://localhost:7141/api/Users/"
  private offerUrl: string = "https://localhost:7141/api/Offers/"
  private gameUrl: string = "https://localhost:7141/api/Games/"
  private setAdmUrl: string = "https://localhost:7141/api/Users/setadmin"
  private deleteUserUrl: string = "https://localhost:7141/api/Users/delete/"

  constructor(private http: HttpClient) {}

  

  getUsers() {
    return this.http.get<any>(this.baseUrl + "getallusersinfo");
  }
  
  getGames() {
    return this.http.get<any>(this.gameUrl + "getAllGames");
  }

  getPlatforms() {
    return this.http.get<any>(this.gameUrl + "getPlatforms");
  }

  getOfferTypes() {
    return this.http.get<any>(this.gameUrl + "getOfferTypes");
  }

  getGenres() {
    return this.http.get<any>(this.gameUrl + "getAllGenres");
  }

  getUserById() {
    return this.http.get<any>(this.baseUrl + "")
  }

  DeleteUserById(userId : any) {
    return this.http.delete<any>(this.deleteUserUrl + userId);
  }

  UpdateUser(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}update`, userObj)
  }

  PublishOffer(offerObj: any) {
    return this.http.post<any>(`${this.offerUrl}publish`, offerObj)
  }

  

}


// .pipe(map((res:any)=>{
//   return res;
// }))