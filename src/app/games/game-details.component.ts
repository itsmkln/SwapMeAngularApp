import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from './game.service';
import { GamesListComponent } from './games-list.component';
import { GamesModel } from "./games.model";

@Component({
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  pageTitle: string = "Offer Details";
  gameName: string = "";

  offersJSON: GamesModel | undefined;
 
  dupa: any = [];
  
  test: any = [];



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

    const huj = this.offersJSON = JSON.parse(this.route.snapshot.paramMap.get("offersObj") || "{}");

    this.dupa = huj.filter((o: { offerId: number; }) => o.offerId == id);



    console.log(this.dupa);

    //this.offers = JSON.parse(String(this.route.snapshot.paramMap.get("offersPass")));
    // console.log(typeof(this.offers));
    // console.log(this.offers);

    

    //this.offers.filter(offer => offer.offerId == id);


    // const offersParsed = JSON.parse(this.offers);
    // console.log(typeof(offersParsed));
    // console.log(offersParsed);
    //console.log(JSON.parse(this.route.snapshot.paramMap.get("offersPass")))
    //const obj = JSON.parse(this.route.snapshot.paramMap.get("offers_object"));



    //var selectedOffer = test.filter(gameId => gameId === id

    





    this.pageTitle += `: id ${offerId}`;


    this.gameName = `${gameName}`;


    }



    
    onBack(): void {
      this.router.navigate(["/offers"]);
    }

    onBuy(offerId: number) {
      confirm("Are u sure?");



      this.router.navigate(["/transactions"])
    }

  }