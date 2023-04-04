import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'


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
import { UsermanagerComponent } from './components/dashboard/admin-dashboard/usermanager/usermanager.component';
import { GamemanagerComponent } from './components/dashboard/admin-dashboard/gamemanager/gamemanager.component';
import { OffersComponent } from './offers/offers.component';
import { AddofferComponent } from './offers/addoffer/addoffer.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ArraySortPipe } from './login-register/helpers/alphabetical';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatOptionSelectionChange } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OffermanagerComponent } from './components/dashboard/admin-dashboard/offermanager/offermanager.component';
import { GenremanagerComponent } from './components/dashboard/admin-dashboard/genremanager/genremanager.component';
import { PlatformmanagerComponent } from './components/dashboard/admin-dashboard/platformmanager/platformmanager.component';
import { MyOffersComponent } from './components/dashboard/my-offers/my-offers.component';
import { MyProfileComponent } from './components/dashboard/my-profile/my-profile.component';
import { MyTransactionsComponent } from './components/dashboard/my-transactions/my-transactions.component';
import { MyTransactionsDetailsComponent } from './components/dashboard/my-transactions/my-transactions-details/my-transactions-details.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LogoComponent,
    DashboardComponent,
    AdminDashboardComponent,
    UsermanagerComponent,
    GamemanagerComponent,
    OffersComponent,
    AddofferComponent,
    TransactionsComponent,
    OffermanagerComponent,
    GenremanagerComponent,
    PlatformmanagerComponent,
    MyOffersComponent,
    MyProfileComponent,
    MyTransactionsComponent,
    MyTransactionsDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "welcome", component: WelcomeComponent},
      { path: "", redirectTo: "welcome", pathMatch: "full" },
      { path: "**", redirectTo: "welcome", pathMatch: "full" },
      // { path: "login", redirectTo: "login", pathMatch: "full" },
      // { path: "register", redirectTo: "register", pathMatch: "full" },
      // { path: "usermanager", redirectTo: "usermanager", pathMatch: "full"},
      // { path: "gamemanager", redirectTo: "gamemanager", pathMatch: "full"},
      // { path: "addoffer", redirectTo: "addoffer", pathMatch: "full"}



    ]),
    LoginRegisterModule,
    GameModule,
    NgToastModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    BrowserAnimationsModule,

  ],

  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
     {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
