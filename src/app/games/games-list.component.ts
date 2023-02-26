import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
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

    constructor(private gameService: GameService, private api: ApiService) {}

    performFilter(filterBy: string): GamesModel[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.games.filter((game: GamesModel) =>
          game.name.toLocaleLowerCase().includes(filterBy));
    }

    disableImage(): void {
        this.hideImage = !this.hideImage;
    }


    ngOnInit(): void {
        

        this.sub = this.gameService.getGames().subscribe({
                next: games => {
                    this.games = games,
                    this.filteredGames = games;
                },
                error: err => this.errorMessage = err
            });

            this.getAllGenres();

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

    





}

