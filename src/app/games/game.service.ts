import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, filter, tap } from 'rxjs/operators';
import { ApiService } from "../services/api.service";
import { GameDetailsComponent } from "./game-details.component";
import { OffersModel } from "./offers.model";

@Injectable({
    providedIn: "root"
})

export class GameService {

    private offerUrl = "https://localhost:7141/api/Offers/getOffers"
    errorMessage: any;

    constructor(private http: HttpClient, private gameDetails: GameDetailsComponent) {}

    getOffers(): Observable<OffersModel[]> {
        return this.http.get<OffersModel[]>(this.offerUrl).pipe(
            tap(data => console.log("All:" , JSON.stringify(data))),
            catchError(this.handleError)
        );
    }






    private handleError(err: HttpErrorResponse) {
        // in real world we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = "";
        if (err.error instanceof ErrorEvent) {
            // a client-side or network error has occurred. handle it accordingly
            errorMessage = `An error has occurred: ${err.error.message}`;
        } else {
            // backend has returned an unsuccessful response code
            // the response body may contain clues as to what went wrong
            errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
        
}
