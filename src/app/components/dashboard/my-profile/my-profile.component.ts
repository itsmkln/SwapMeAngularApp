import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserModel } from '../admin-dashboard/usermanager/usermanager.model';
import { UserDto } from '../admin-dashboard/usermanager/usermanager.model-dto';
import { MyProfileInterface } from './my-profile.interface';
import { MyProfileModel } from './my-profile.model';

@Component({
  selector: 'gts-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  formValue !: FormGroup;

  userId : number = 0;


  userObj : MyProfileModel = new MyProfileModel();

  
  showUpdate !: boolean;
  @Input() receive !: string;



  constructor(private http: HttpClient, private formBuilder: FormBuilder, private toast: NgToastService, private auth: AuthService, private api: ApiService, private router: Router, private userStore: UserStoreService) 
  {}

  ngOnInit(): void {
    this.userId = this.auth.getId();
    //this.userObj = this.getUserDetails();
    this.getUserDetails();



    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      city: [''],
      state: [''],
    })







    //console.log(this.userDetails.userInfo.firstName)









  }

  getUserDetails() {
    this.api.GetUserDetails(this.userId) 
    .subscribe(res=>{
      this.formValue.controls['firstName'].setValue(res.userInfo.firstName);
      this.formValue.controls['lastName'].setValue(res.userInfo.lastName);
      this.formValue.controls['email'].setValue(res.email);
      this.formValue.controls['phoneNumber'].setValue(res.userInfo.phoneNumber);
      this.formValue.controls['city'].setValue(res.userInfo.city);
      this.formValue.controls['state'].setValue(res.userInfo.state);
    })
  }




//   getUserDetail(): Observable<MyProfileModel[]> {
//     return this.http.get<MyProfileModel[]>(this.offerUrl).pipe(
//         tap(data => console.log("All:" , JSON.stringify(data))),
//         catchError(this.handleError)
//     );
// }

  onBack() {
    this.router.navigate(["/dashboard"])
  }

  updateUser(userId : number) {
    // this.userObj.userInfo.firstName = this.formValue.value.firstName;
    // this.userObj.userInfo.lastName = this.formValue.value.lastName;
    // this.userObj.email = this.formValue.value.email;
    // this.userObj.userInfo.phoneNumber = this.formValue.value.phoneNumber;
    // this.userObj.userInfo.city = this.formValue.value.city;
    // this.userObj.userInfo.state = this.formValue.value.state;

    this.userObj.userId = this.userId;
    this.userObj.firstName = this.formValue.value.firstName;
    this.userObj.lastName = this.formValue.value.lastName;
    this.userObj.email = this.formValue.value.email;
    this.userObj.phoneNumber = this.formValue.value.phoneNumber;
    this.userObj.city = this.formValue.value.city;
    this.userObj.state = this.formValue.value.state;
    console.log(this.userObj);

    this.api.UpdateUserProfile(this.userObj)
    .subscribe(res => {
      this.router.navigate(['/dashboard']);
      this.toast.success({detail: "SUCCESS", summary:"User has been edited."})
    })


  }

}
