import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GamesModel } from '../games/games.model';
import { OfferDto } from '../offers/addoffer/addoffer.model';
import { TransactionsViewModel } from '../offers/transactions/transactionsView.model';
import { TransactionsModel } from '../transactions/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private userUrl: string = "https://localhost:7141/api/Users/"
  private offerUrl: string = "https://localhost:7141/api/Offers/"
  private gameUrl: string = "https://localhost:7141/api/Games/"
  private transactionUrl: string = "https://localhost:7141/api/Transactions/"
  private setAdmUrl: string = "https://localhost:7141/api/Users/setadmin"
  private deleteUserUrl: string = "https://localhost:7141/api/Users/delete/"

  constructor(private http: HttpClient) {}

  
  //Users 

  getUsers() {
    return this.http.get<any>(this.userUrl + "getallusersinfo");
  }

  getUserById() {
    return this.http.get<any>(this.userUrl + "")
  }

  DeleteUserById(userId : any) {
    return this.http.delete<any>(this.deleteUserUrl + userId);
  }

  UpdateUser(userObj: any) {
    return this.http.post<any>(`${this.userUrl}update`, userObj)
  }

  //Games
  
  getGames() {
    return this.http.get<GamesModel>(this.gameUrl + "getAllGames");
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



  //Offers

  PublishOffer(offerObj: OfferDto) {
    return this.http.post(`${this.offerUrl}addOffer`, offerObj)
  }

  GetOffers() {
    return this.http.get<GamesModel[]>(this.offerUrl + "getOffers")
  }

  //Transactions

  AcceptOffer(transactionObj: TransactionsModel) {
    return this.http.post(`${this.transactionUrl}addTransaction`, transactionObj)
  }

  GetTransactions() {
    return this.http.get<TransactionsViewModel>(this.transactionUrl + "getTransactions")
  }



  

}


// .pipe(map((res:any)=>{
//   return res;
// }))