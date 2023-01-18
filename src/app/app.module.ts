import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { LogoComponent } from './home/logo.component';
import { GameModule } from './games/game.module';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRegisterModule } from './login-register/login-register.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AppComponent, 
    WelcomeComponent,
    LogoComponent,
    DashboardComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    RouterModule.forRoot([
      { path: "welcome", component: WelcomeComponent},
      { path: "", redirectTo: "welcome", pathMatch: "full" },
      { path: "**", redirectTo: "welcome", pathMatch: "full" },
      { path: "login", redirectTo: "login", pathMatch: "full" },
      { path: "register", redirectTo: "register", pathMatch: "full" },
      
    
    ]),
    LoginRegisterModule,
    GameModule,
    NgToastModule,
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
