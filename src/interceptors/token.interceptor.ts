import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`} // bearer 
      })
    }


    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this.toast.warning({detail: "401 ERROR", summary: "Token is expired, please login again."});
            this.router.navigate(['login'])
          }
        }
        return throwError(()=> new Error("Some other error occured"))
      })
    );
  }
}
