import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'gts-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.css']
})
export class MyTransactionsComponent {

  transactions: any = []
  currentUser: number = 0;


  constructor(private toast: NgToastService, private auth: AuthService, private api: ApiService, private router: Router, private userStore: UserStoreService) 
  {}

  ngOnInit(): void {
    this.currentUser = this.auth.getId();

    this.getSellerView();



  }

          getSellerView() {
        this.api.GetTransactions(this.currentUser)
        .subscribe(res=>{
          this.transactions = res;
        })
      }
}
