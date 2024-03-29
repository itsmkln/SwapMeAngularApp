import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { ApiService } from "../services/api.service";
import { SharedService } from "../shared/shared.service";
import { GameService } from "./game.service";
import { OffersModel } from "./offers.model";

@Component({
    templateUrl: './games-list.component.html',
    styleUrls: ['./games-list.component.css'],
    providers: [GameService]
})




export class GamesListComponent implements OnInit, OnDestroy {

    
    pageTitle: string = "";
    imageWidth: number = 200;
    imageMargin: number = 10;
    hideImage: boolean = false;
    isAvailable: boolean = true;
    errorMessage: string = "";
    sub!: Subscription;
    offers: any = [];
    genres: any = [];
    //public games : any = []

    private _listFilter: string = "";
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log("In setter:", value);
        this.filteredGames = this.performFilter(value);
    }

    filteredGames: OffersModel[] = [];
    games: OffersModel[] = [];

    constructor(private gameService: GameService, private api: ApiService, private router: Router, private shared: SharedService) {}


    performFilter(filterBy: string): OffersModel[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.games.filter((game: OffersModel) =>
          game.gameName.toLocaleLowerCase().includes(filterBy));
    }


    disableImage(): void {
        this.hideImage = !this.hideImage;
    }


    ngOnInit(): void {
        

        this.sub = this.api.GetOffers().subscribe({
                next: games => {
                    this.games = games,
                    this.filteredGames = games;
                },
                error: err => this.errorMessage = err
            });

    }

    getOfferDetails() {
        this.api.GetOffers()
        .subscribe(res =>{
          this.offers = res;
        })
      }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = message;
    }

    onClick(offerId: any) {
        this.shared.offerObj = JSON.stringify(this.games); 
        this.router.navigate(["/offers/"+offerId])

        //{ offersObj: JSON.stringify(this.games)}, caused problems with URL
        
    }

    





}

