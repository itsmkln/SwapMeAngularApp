import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/shared/shared.service';
import { OffersEndedModel } from '../../my-offers/my-offers-ended.model';

@Component({
  selector: 'gts-my-transactions-details',
  templateUrl: './my-transactions-details.component.html',
  styleUrls: ['./my-transactions-details.component.css']
})
export class MyTransactionsDetailsComponent {

  offerJSON: OffersEndedModel | undefined;
  offer: any = [];
  offerId: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService,
    private api: ApiService, private toast: NgToastService, private shared: SharedService) 
 {}

 ngOnInit(): void {
  //const id = Number(this.route.snapshot.paramMap.get("id"))
  const id = Number(this.route.snapshot.paramMap.get("id"))
  this.offerId = id;
  this.getOffer();



 }

 
 getOffer() {
  const offersGet = this.offerJSON = JSON.parse((this.shared.offerObj) || "{}");
  
  try {
    this.offer = offersGet.filter((o: { offerId: number; }) => o.offerId == this.offerId);
  } catch (error) {
    this.router.navigate(['/mytransactions']);
  }


 }

 onBack(): void {
  this.router.navigate(["/mytransactions"]);
}

}