import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AddPlatformModel } from './add-platform.model';


@Component({
  selector: 'gts-platformmanager',
  templateUrl: './platformmanager.component.html',
  styleUrls: ['./platformmanager.component.css']
})
export class PlatformmanagerComponent {
  role: string = "";
  formValue !: FormGroup;
  platforms: any = [];
  platformObj: AddPlatformModel = new AddPlatformModel();

  constructor(private toast: NgToastService, private formBuilder: FormBuilder, private auth: AuthService, private api: ApiService, private router: Router, private userStore: UserStoreService) 
  {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      platformName: ['']
    })


    this.checkAdmin();
    this.getPlatformDetails();
  }


  getPlatformDetails() {
    this.api.getPlatforms()
    .subscribe(res=>{
      this.platforms = res;
    })
  }


  addPlatform() {
    this.platformObj.Name = this.formValue.value.platformName;

    this.api.AddPlatform(this.platformObj)
    .subscribe(res => {
      this.toast.success({detail: "SUCCESS", summary:"Platform has been added."})
      let ref = document.getElementById('close');
      ref?.click();

      this.getPlatformDetails();
      this.router.navigate(["platformmanager"])
    })

  }
  
  deletePlatform(platformId: number) {
    let confirmed = confirm("Are you sure? You will not be able to recover this item.");
    if(confirmed) {
      this.api.DeletePlatformById(platformId)
      .subscribe(res=>{
        this.toast.success({detail: "SUCCESS", summary: "Platform has been removed.", duration: 2000})
        this.getPlatformDetails();
    });
  }
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
