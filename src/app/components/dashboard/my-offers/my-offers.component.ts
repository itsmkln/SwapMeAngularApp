import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { SharedService } from 'src/app/shared/shared.service';
import { OffersEditModel } from './my-offers-edit.model';
import { OffersEndedModel } from './my-offers-ended.model';
import { OfferUpdateModel } from './my-offers-update.model';

@Component({
  selector: 'gts-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent {
  formValue !: FormGroup;

  exchangeOfferTypeId: number = 2;
  currentUser: number = 0;
  activeOffers: any = [];
  endedOffers: any = [];
  endedOffersExport = new OffersEndedModel();

  offerTypes: any = [];

  offerObj : OfferUpdateModel = new OfferUpdateModel();
  
  showUpdate !: boolean;


  @Input() receive !: string;

  constructor(private shared: SharedService, private formBuilder: FormBuilder, private toast: NgToastService, private auth: AuthService, private api: ApiService, private router: Router, private userStore: UserStoreService) 
  {}

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      offerId: [''],
      offerTypeName: [''],
      offerTypeId: [''],
      offerDescription: [''],
      offerPrice: ['']
    })

    this.currentUser = this.auth.getId();
    this.getOfferTypes();
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
          this.endedOffersExport = res;
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
        this.offerObj.OfferId = this.formValue.value.offerId;

        console.log(this.offerObj.OfferId);
        console.log(this.offerObj.OfferDescription);
        console.log(this.offerObj.OfferTypeId);
        console.log(this.offerObj.Price);

        console.log(this.offerObj);

        this.api.UpdateOffer(this.offerObj)
        .subscribe(res => {
          let ref = document.getElementById('close');
          ref?.click();
          this.toast.success({detail: "SUCCESS", summary: "Offer edited successfully.", duration: 2000})
          this.getActive();
        })


      }

      onEdit(offer: any) {
        this.formValue.controls['offerTypeName'].setValue(offer.offerTypeName);
        this.formValue.controls['offerTypeId'].setValue(offer.offerTypeId);
        this.formValue.controls['offerDescription'].setValue(offer.offerDescription);
        this.formValue.controls['offerTypeName'].setValue(offer.offerTypeName);
        this.formValue.controls['offerPrice'].setValue(offer.price);
        this.formValue.controls['offerId'].setValue(offer.offerId);
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
        this.shared.offerObj = JSON.stringify(this.endedOffersExport);
        this.router.navigate(["/myoffers/"+offerId])
      }


      findOfferTypeId() {
        this.offerTypes.forEach((offerType: any) => {
          if(this.formValue.value.offerTypeName == offerType.name)
          this.offerObj.OfferTypeId = offerType.offerTypeId;
        });
          console.log("offerObj.OfferTypeId has been set to " + this.offerObj.OfferTypeId + " as selected offer type was " + this.formValue.value.offerTypeName);
        }


        
      isExchange(){
        if(this.formValue.value.offerTypeId == this.exchangeOfferTypeId) {
          this.formValue.value.offerPrice = 0;
          this.offerObj.Price = 0;
          return true;
        }
        return false;
      }
      }

      

