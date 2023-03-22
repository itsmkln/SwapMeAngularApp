import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { ApiService } from "../services/api.service";
import { GameService } from "./game.service";
import { GamesModel } from "./games.model";

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

    filteredGames: GamesModel[] = [];
    games: GamesModel[] = [];

    constructor(private gameService: GameService, private api: ApiService, private router: Router) {}

    performFilter(filterBy: string): GamesModel[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.games.filter((game: GamesModel) =>
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

    getAllGenres() {
        this.api.getGenres()
        .subscribe(res=>{
          this.genres = res;
        })
      }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = message;
    }

    onClick(offerId: any) {
        this.router.navigate(["/offers/"+offerId, {offersObj: JSON.stringify(this.games)}])
    }

    





}

