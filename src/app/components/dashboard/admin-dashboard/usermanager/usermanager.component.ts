import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserModel } from './usermanager.model';



@Component({
  selector: 'gts-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit{
  formValue !: FormGroup;
  public users : any = [];
  userObj : UserModel = new UserModel();
  // userData !: any;
  showUpdate !: boolean;
  @Input() receive !: string;


  constructor(private toast: NgToastService, private formBuilder: FormBuilder, private auth: AuthService, private api: ApiService, private router: Router, private userStore: UserStoreService) 
  {}

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      city: [''],
      state: ['']
    })
    this.getUserDetails();

  }

  getUserDetails() {
    this.api.getUsers()
    .subscribe(res=>{
      this.users = res;
    })
  }



  editUser(){
    this.userObj.Username = this.formValue.value.username;
    this.userObj.FirstName = this.formValue.value.firstName;
    this.userObj.LastName = this.formValue.value.lastName;
    this.userObj.Email = this.formValue.value.email;
    this.userObj.PhoneNumber = this.formValue.value.phoneNumber;
    this.userObj.State = this.formValue.value.state;
    this.userObj.City = this.formValue.value.city;
    this.api.UpdateUser(this.userObj)
    .subscribe(res=>{
      alert("WOWOWOWOWO")
      let ref = document.getElementById('close');
      ref?.click();
      this.getUserDetails();
      console.log("END");
    })
  }

  onEdit(user : any){
    this.userObj.UserId = user.userId;

    console.log(this.userObj.UserId);
    console.log(this.userObj.FirstName);


    // this.userObj.FirstName = user.userinfo.firstName;
    // this.userObj.LastName = user.userinfo.lastName;
    // this.userObj.Email = user.email;
    // this.userObj.PhoneNumber = user.userinfo.phoneNumber;
    // this.userObj.State = user.userinfo.state;
    // this.userObj.City = user.userinfo.city;
    
    this.formValue.controls['username'].setValue(user.username);
    this.formValue.controls['firstName'].setValue(user.userInfo.firstName);
    this.formValue.controls['lastName'].setValue(user.userInfo.lastName);
    this.formValue.controls['email'].setValue(user.email);
    this.formValue.controls['phoneNumber'].setValue(user.userInfo.phoneNumber);
    this.formValue.controls['state'].setValue(user.userInfo.state);
    this.formValue.controls['city'].setValue(user.userInfo.city);
    
    console.log(this.userObj.FirstName);

    this.showUpdate = true;
  }


  deleteUser(user: any) {
    console.log(user.userId)
    let confirmed = confirm("You sure?");
    if(confirmed) {
      this.api.DeleteUserById(user.userId)
      .subscribe({
      next: (res) => {
        this.toast.success({detail: "SUCCESS", summary:res.message, duration: 2000})
        this.getUserDetails();
      }
    });
  }

  }
}
