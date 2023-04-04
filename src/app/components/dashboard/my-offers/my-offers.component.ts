import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'gts-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent {
  currentUser: number = 0;
  activeOffers: any = [];
  endedOffers: any = [];



  constructor(private toast: NgToastService, private auth: AuthService, private api: ApiService, private router: Router, private userStore: UserStoreService) 
  {}

  ngOnInit(): void {
    this.currentUser = this.auth.getId();
    this.getActive();
    this.getEnded();


  }
      getActive() {
        this.api.GetActiveOffers(this.currentUser)
        .subscribe(res=>{
          this.activeOffers = res;
        })
      }

      getEnded() {
        this.api.GetEndedOffers(this.currentUser)
        .subscribe(res=>{
          this.endedOffers = res;
        })
      }
}
