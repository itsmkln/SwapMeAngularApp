import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { SharedService } from 'src/app/shared/shared.service';
import { OffersActiveModel } from '../../my-offers/my-offers-active.model';
import { OffersEditModel } from '../../my-offers/my-offers-edit.model';

@Component({
  selector: 'gts-offermanager',
  templateUrl: './offermanager.component.html',
  styleUrls: ['./offermanager.component.css']
})
export class OffermanagerComponent {
  role: string = "";
  formValue !: FormGroup;

  
  currentUser: number = 0;
  activeOffers: any = [];
  endedOffers: any = [];
  offerTypes: any = [];

  offerObj : OffersEditModel = new OffersEditModel();
  
  showUpdate !: boolean;

  constructor(private shared: SharedService, private formBuilder: FormBuilder, private toast: NgToastService, private auth: AuthService, private api: ApiService, private router: Router, private userStore: UserStoreService) 
  {}

  ngOnInit(): void {
    this.checkAdmin();
    this.getActive();
    this.getEnded();


  }
      getActive() {
        this.api.GetAllActiveOffers()
        .subscribe(res=>{
          this.activeOffers = res;
        })
      }

      getEnded() {
        this.api.GetAllEndedOffers()
        .subscribe(res=>{
          this.endedOffers = res;
        })
      }

      getOfferTypes() {
        this.api.getOfferTypes()
        .subscribe(res => {
          this.offerTypes = res;
        })
      }


      editOffer(){
        this.offerObj.OfferTypeId = this.formValue.value.offerTypeId;
        this.offerObj.OfferDescription = this.formValue.value.offerDescription;
        this.offerObj.Price = this.formValue.value.offerPrice;
      }

      onEdit(offer: any) {
        this.offerObj.OfferId = offer.offerId;
        this.formValue.controls['offerTypeId'].setValue(offer.offerTypeId);
        this.formValue.controls['offerDescription'].setValue(offer.offerDescription);
        this.formValue.controls['offerPrice'].setValue(offer.price);

        this.showUpdate = true;
      }

      deleteOffer(offerId: number) {
        let confirmed = confirm("Are you sure? You will not be able to recover this offer.")
        if(confirmed) {
        this.api.DeleteOfferById(offerId)
        .subscribe(res => {
          this.toast.success({detail: "SUCCESS", summary: "Offer removed successfully.", duration: 2000})
          this.getActive();
          this.getEnded();
        })
        }
          
        }

      viewDetails(offerId: any) {
        this.shared.offerObj = JSON.stringify(this.endedOffers);
        this.router.navigate(["/offermanager/"+offerId])
      }



        
      isExchange(){
        //if(this.formValue.value.offerTypeName == "Exchange") {
        if(this.formValue.value.offerTypeId = 2) {

          this.formValue.value.offerPrice = 0;
          this.offerObj.Price = 0;
          return true;
        }
        return false;
      }

      checkAdmin(){
        this.userStore.getRoleFromStore()
        .subscribe(val=>{
          const roleFromToken = this.auth.getRoleFromToken();
          this.role = val || roleFromToken
        });
      
        if (this.role != 'Admin') {
          this.toast.error({detail: "ERROR", summary: "You need to login as Admin" });
          this.router.navigate(['welcome']);
          }
        }
    }