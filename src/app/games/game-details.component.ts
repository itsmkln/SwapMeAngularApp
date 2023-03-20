import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from './game.service';
import { GamesModel } from "./games.model";

@Component({
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  pageTitle: string = "Offer Details";
  gameName: string = "";
  
  
  test: any = [];

  game: GamesModel | undefined;

  constructor(private route: ActivatedRoute, private router: Router) { }

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


    //var selectedOffer = test.filter(gameId => gameId === id

    





    this.pageTitle += `: id ${offerId}`;


    this.gameName = `${gameName}`;

    this.game = {
      "gameId": gameId,
      "gameName": gameName,
      "offerId": id,
      "genreId": genreId,
      "genreName": genreName,
      "platformName": platformName,
      "sellerName": sellerName,
      "offerTypeName": offerTypeName,
      "description": description,
      "price": price,
      "status": status,
      "createdOn": createdOn,
      "isPhysical": isPhysical,
    };

    
    }


    // filterById(id: number) {
    //   this.test = this.test.filter(offer => offer.id === id);
    // }

    // gameDetailsTest() {
    //   this.test.forEach((game: any) => {
    //     if(game.offerId == game.id) {
    //       console.log(game.gameName);
    //     }
    //   });
    // }

    // getOfferDetails() {
    //   this.gameService.getOffers()
    //   .subscribe(res =>{
    //     this.test = res;
    //   })
    // }

    
    onBack(): void {
      this.router.navigate(["/offers"]);
    }

  }