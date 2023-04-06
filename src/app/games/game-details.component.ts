import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../shared/shared.service';
import { TransactionsModel } from '../transactions/transactions.model';
import { GameService } from './game.service';
import { GamesListComponent } from './games-list.component';
import { OffersModel } from './offers.model';
import { StatusUpdateModel } from './status-update.model';

@Component({
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  pageTitle: string = "Offer Details";
  gameName: string = "";
  currentOffer: number = Number(this.route.snapshot.paramMap.get("id"));
  statusObj: StatusUpdateModel = new StatusUpdateModel();

  idStr = this.auth.getId();
  userId: number = +this.idStr;
  transactionObj: TransactionsModel = new TransactionsModel();
  offersJSON: OffersModel | undefined;
 
  offers: any = [];
  test: any = [];



  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService,
     private api: ApiService, private toast: NgToastService, private shared: SharedService) 
  {
  }

  ngOnInit(): void {

  

    const id = Number(this.route.snapshot.paramMap.get("id"));
    const gameId = Number(this.route.snapshot.paramMap.get("gameId"));
    const genreId = Number(this.route.snapshot.paramMap.get("genreId"));
    const gameName = String(this.route.snapshot.paramMap.get("gameName"));
    const genreName = String(this.route.snapshot.paramMap.get("genreName"));
    const platformName = String(this.route.snapshot.paramMap.get("platformName"));
    const sellerName = String(this.route.snapshot.paramMap.get("sellerName"));
    const offerTypeName = String(this.route.snapshot.paramMap.get("offerTypeName"));
    const description = String(this.route.snapshot.paramMap.get("description"));
    const price = Number(this.route.snapshot.paramMap.get("price"));
    const status = String(this.route.snapshot.paramMap.get("status"));
    const createdOn = String(this.route.snapshot.paramMap.get("createdOn"));
    const isPhysical = Boolean(this.route.snapshot.paramMap.get("isPhysical"));
    const offerId = Number(this.route.snapshot.paramMap.get("offerId"));

    //const offersGet = this.offersJSON = JSON.parse(this.route.snapshot.paramMap.get("offersObj") || "{}");
    const offersGet = this.offersJSON = JSON.parse((this.shared.offerObj) || "{}");
    this.offers = offersGet.filter((o: { offerId: number; }) => o.offerId == id);
    }




    
    onBack(): void {
      this.router.navigate(["/offers"]);
    }

    onBuy(offerId: number) {
      confirm("Are you sure?");

      this.acceptOffer();

    }

    acceptOffer() {
      var currentDate = new Date();

      console.log(this.offers.offerId);
      
      this.transactionObj.OfferId = this.currentOffer;
      this.transactionObj.EndedOn = currentDate.toJSON();
      this.transactionObj.BuyerId = this.userId;

      this.statusObj.OfferId = this.currentOffer;
      this.statusObj.Status = "Ended";



      this.api.AcceptOffer(this.transactionObj)
      .subscribe(res => {
        this.api.UpdateStatus(this.statusObj)
        .subscribe(res => {
        this.toast.success({detail: "SUCCESS", summary: "Offer has been accepted."})
        this.router.navigate(["mytransactions"])
      })
    })


    

    }

  }