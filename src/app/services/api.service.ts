import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddGameModel } from '../components/dashboard/admin-dashboard/gamemanager/add-game.model';
import { GameManagerModel } from '../components/dashboard/admin-dashboard/gamemanager/gamemanager.model';
import { AddGenreModel } from '../components/dashboard/admin-dashboard/genremanager/add-genre.model';
import { AddPlatformModel } from '../components/dashboard/admin-dashboard/platformmanager/add-platform.model';
import { OffersActiveModel } from '../components/dashboard/my-offers/my-offers-active.model';
import { OffersEndedModel } from '../components/dashboard/my-offers/my-offers-ended.model';
import { OffersModel } from '../games/offers.model';
import { StatusUpdateModel } from '../games/status-update.model';
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
    return this.http.get<OffersModel>(this.gameUrl + "getAllGames");
  }

  AddPlatform(platformObj: AddPlatformModel) {
    return this.http.post<AddPlatformModel>(`${this.gameUrl}addPlatform`, platformObj)
  }

  DeletePlatformById(platformId: number) {
    return this.http.delete(`${this.gameUrl}deletePlatformById/`+ platformId)
  }

  getPlatforms() {
    return this.http.get<any>(this.gameUrl + "getPlatforms");
  }

  getOfferTypes() {
    return this.http.get<any>(this.gameUrl + "getOfferTypes");
  }

  AddGenre(genreObj: AddGenreModel) {
    return this.http.post<AddGenreModel>(`${this.gameUrl}addGenre`, genreObj)
  }

  DeleteGenreById(genreId: number) {
    return this.http.delete(`${this.gameUrl}deleteGenreById/`+ genreId)
  }

  getGenres() {
    return this.http.get<any>(this.gameUrl + "getAllGenres");
  }

  getGamesView() {
    return this.http.get<GameManagerModel>(this.gameUrl + "getAllGamesView");
  }

  AddGame(gameObj: AddGameModel) {
    return this.http.post(`${this.gameUrl}addGame`, gameObj)
  }

  DeleteGameById(gameId: number) {
    return this.http.delete(`${this.gameUrl}deleteGameById/`+ gameId)
  }

  //Games test
  
  GetGames(): Observable<GameManagerModel[]>{
    return this.http.get<GameManagerModel[]>("https://localhost:7141/api/Games/getAllGamesView");
  }



  //Offers

  PublishOffer(offerObj: OfferDto) {
    return this.http.post(`${this.offerUrl}addOffer`, offerObj)
  }

  GetOffers() {
    return this.http.get<OffersModel[]>(this.offerUrl + "getOffers")
  }

  UpdateStatus(statusObj: StatusUpdateModel) {
    return this.http.post<StatusUpdateModel>(`${this.offerUrl}statusUpdate`, statusObj)
  }

  DeleteOfferById(offerId: number) {
    return this.http.delete(`${this.offerUrl}deleteOfferById/`+ offerId)
  }

  //Transactions

  AcceptOffer(transactionObj: TransactionsModel) {
    return this.http.post(`${this.transactionUrl}addTransaction`, transactionObj)
  }

  GetTransactions(userId: any) {
    return this.http.get<TransactionsViewModel>(`${this.transactionUrl}getTransactionsView/`+userId)
  }


  //dashboard 


  GetActiveOffers(sellerId: any) {
    return this.http.get<OffersActiveModel>(`${this.offerUrl}getActiveOffers/`+sellerId)
  }

  GetEndedOffers(sellerId: any) {
    return this.http.get<OffersEndedModel>(`${this.offerUrl}getEndedOffers/`+sellerId)
  }

  GetBuyerView(buyerId: any) {
    return this.http.get<TransactionsViewModel>(`${this.transactionUrl}getBuyerView/`+buyerId)
  }





  

}


// .pipe(map((res:any)=>{
//   return res;
// }))