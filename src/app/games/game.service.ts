import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from "../services/api.service";
import { GamesModel } from "./games.model";

@Injectable({
    providedIn: "root"
})

export class GameService {

    private gameUrl = "https://localhost:7141/api/Games/getAllGames"
    errorMessage: any;

    constructor(private http: HttpClient) {}

    getGames(): Observable<GamesModel[]> {
        return this.http.get<GamesModel[]>(this.gameUrl).pipe(
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
