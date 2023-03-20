import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { OfferDto } from './addoffer.model';

@Component({
  selector: 'gts-addoffer',
  templateUrl: './addoffer.component.html',
  styleUrls: ['./addoffer.component.css']
})

export class AddofferComponent implements OnInit {
  addOfferForm !: FormGroup;
  formValue !: FormGroup;
  games: any = [];
  offerTypes: any = [];
  platforms: any = [];
  distributions: any =[["Digital"], ["Box"]];
  offerObj : OfferDto = new OfferDto()
  status: string = "";

  @Input() receive !: string;
  


  constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: ApiService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      game: [''],
      isPhysical: [''],
      price: [''],
      platform: [''],
      offerType: [''],
      description: [''],
    })

    //this.auth.isLoggedIn(); todo must be logged in
    this.auth.getId();
    this.getAllGames();
    this.getAllPlatforms();
    this.getAllOfferTypes();

  }

  publishOffer(){
    var currentDate = new Date();
    this.findGameId();
    this.findPlatformId();
    this.findOfferTypeId();
    this.isBox();

    this.offerObj.CreatedOn = currentDate.toJSON();
    console.log(this.offerObj.CreatedOn);
    


    this.offerObj.Price = this.formValue.value.price;
    console.log("offerObj.Price has been set to " + this.offerObj.Price)

    var sellerIdNumber = Number(this.auth.getId());
    this.offerObj.SellerId = sellerIdNumber;
    this.offerObj.Description = this.formValue.value.description;
    this.offerObj.Status = "New";

    this.api.PublishOffer(this.offerObj)
    .subscribe(res=>{
      console.log(this.offerObj);
      alert("okurwa")
      this.getOfferDetails();
      this.toast.success({detail: "SUCCESS", summary:"Offer has been published."})
      this.router.navigate(["games"])
    })
  }
      
  getOfferDetails() {
    this.api.GetOffers()
    .subscribe(res =>{
      this.games = res;
    })
  }

  isExchange(){
    if(this.formValue.value.offerType == "Exchange") {
      this.formValue.value.price = 0;
      this.offerObj.Price = 0;
      return true;
    }
    return false;
  }

  getAllGames() {
  this.api.getGames()
  .subscribe(res=>{
    this.games = res;
  })
}
  getAllPlatforms() {
  this.api.getPlatforms()
  .subscribe(res=>{
    this.platforms = res;
  })
}

  getAllOfferTypes() {
  this.api.getOfferTypes()
  .subscribe(res=>{
    this.offerTypes = res;
  })
}



  findGameId() {
    this.games.forEach((game: any) => {
      if(this.formValue.value.game == game.name)
      this.offerObj.GameId = game.gameId;
    });
    console.log("offerObj.GameId has been set to " + this.offerObj.GameId + " as selected game was " + this.formValue.value.game);
  }

  findPlatformId() {
    this.platforms.forEach((platform: any) => {
      if(this.formValue.value.platform == platform.name)
      this.offerObj.PlatformId = platform.platformId;
    });
    console.log("offerObj.PlatformId has been set to " + this.offerObj.PlatformId + " as selected platform was " + this.formValue.value.platform);
  }

  findOfferTypeId() {
    this.offerTypes.forEach((offerType: any) => {
      if(this.formValue.value.offerType == offerType.name)
      this.offerObj.OfferTypeId = offerType.offerTypeId;
    });
      console.log("offerObj.OfferTypeId has been set to " + this.offerObj.OfferTypeId + " as selected offer type was " + this.formValue.value.offerType);
    }

  isBox() {
    if (this.formValue.value.isPhysical == "Box")
    this.offerObj.IsPhysical = true;
    if (this.formValue.value.isPhysical == "Digital")
    this.offerObj.IsPhysical = false;
    console.log("offerObj.IsPhysical has been set to: " + this.offerObj.IsPhysical + " as selected game was " + this.formValue.value.isPhysical);
  }
}
