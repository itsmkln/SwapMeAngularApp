import { Component, NgModule, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { UserStoreService } from "./services/user-store.service"; 

@Component({
  selector: "gts-root",
  template: `

  <style>
  :root {
    /* border radius */
    --radius: 0.2rem;
    }
  
    .nav {
      font-family: Montserrat, sans-serif;
    }
    .nav-list {
      background: white;
      box-shadow: 0px 0px 10px var(--clr-gray200);
      margin-right: 12rem;
      padding: 1 rem 0;
      border-radius: var(--radius);
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  
    .nav-item{
      list-style: none;
      margin-right: 1rem;
    }
  
    .nav-item a {
      text-decoration: none;
      color: black;
    }
  
    .nav-item a:hover {
      color: var(--clr-primary-dark);
    }
  
    .nav-item: first-child {
      margin-right: auto;
      margin-left: 2rem;
    }
  
     .btn-primary {
      background-color: #20a6ff;
      border-color: #C7ED8A;
      margin-right: 15px;
    }
  
     .btn-primary-offer {
      background-color: #B5E61D;
     }
  
    ul {
      list-style-type: none;
    }

  </style>

  <nav class="navbar navbar-light">
  <a class="navbar-brand" routerLink="/"><gts-logo></gts-logo></a>


    <body>
    <ul class="nav-list">


    
    <li class="nav-item">
    <a class="nav-link" *ngIf="auth.isLoggedIn()" routerLink="/dashboard">Dashboard</a>
      </li>
    <li class="nav-item">
    <a class="nav-link" *ngIf="auth.isLoggedIn()" routerLink="/dashboard">Hello, {{firstName}}</a>
      </li>
      <li>
      <a class="btn btn-primary" routerLink="/games">Marketplace</a>
        </li>

        <li>
        <a class="btn btn-primary-offer" routerLink="/addoffer">Add Offer</a>
          </li>

      <li class="nav-item">
      <a class="nav-link" *ngIf="!auth.isLoggedIn()" routerLink="/login">Login</a>
        </li>
      <li class="nav-item">
      <a class="nav-link" *ngIf="auth.isLoggedIn()" (click)="auth.logout()">Logout</a>
        </li>
      <li class="nav-item">
        <a class="nav-link" *ngIf="!auth.isLoggedIn()" routerLink="/register">Register</a>
        </li>

        </ul>
        </body>

  </nav>

  <div class="container"> 
  <lib-ng-toast></lib-ng-toast>
  <router-outlet></router-outlet>
  </div>
      `
})


export class AppComponent {
  pageTitle: string = "SwapMe";
  
  public firstName : string = "";
  public fullName : string = "";
  public role : string = "";

  constructor(public auth: AuthService, private userStore: UserStoreService) {}


  ngOnInit() {

  !!this.auth.isLoggedIn()
  {
    this.userStore.getFirstNameFromStore()
    .subscribe(val=>{
      let firstNameFromToken = this.auth.getFirstNameFromToken();
      this.firstName = val || firstNameFromToken
    })
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    })
    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    })
  }






  

  
  }
}
