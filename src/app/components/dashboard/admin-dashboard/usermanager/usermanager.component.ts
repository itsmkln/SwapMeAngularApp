import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserDto } from './usermanager.model-dto';



@Component({
  selector: 'gts-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit{
  formValue !: FormGroup;
  users : any = [];
  role : string = "";
  // userObj : UserModel = new UserModel();
  userObj : UserDto = new UserDto();

  // userData !: any;
  showUpdate !: boolean;
  @Input() receive !: string;


  constructor(private toast: NgToastService, private formBuilder: FormBuilder, private auth: AuthService, private api: ApiService, private router: Router, private userStore: UserStoreService) 
  {}

  ngOnInit(): void {
    this.checkAdmin();

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

  getUserDetails() {
    this.api.GetUsers()
    .subscribe(res=>{
      this.users = res;
    })
  }



  // editUser(){
  //   this.userObj.Username = this.formValue.value.username;
  //   this.userObj.UserInfo.FirstName = this.formValue.value.firstName;
  //   this.userObj.UserInfo.LastName = this.formValue.value.lastName;
  //   this.userObj.Email = this.formValue.value.email;
  //   this.userObj.UserInfo.PhoneNumber = this.formValue.value.phoneNumber;
  //   this.userObj.UserInfo.State = this.formValue.value.state;
  //   this.userObj.UserInfo.City = this.formValue.value.city;
  //   this.api.UpdateUser(this.userObj)
  //   .subscribe(res=>{
  //     alert("WOWOWOWOWO")
  //     let ref = document.getElementById('close');
  //     ref?.click();
  //     this.getUserDetails();
  //     this.toast.success({detail: "SUCCESS", summary:"User has been edited."})
      
  //   })
  // }

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
      let ref = document.getElementById('close');
      ref?.click();
      this.getUserDetails();
      this.toast.success({detail: "SUCCESS", summary:"User has been edited."})
      
    })
  }


    onEdit(user : any){
    this.userObj.UserId = user.userId;
    this.formValue.controls['username'].setValue(user.username);
    this.formValue.controls['firstName'].setValue(user.userInfo.firstName);
    this.formValue.controls['lastName'].setValue(user.userInfo.lastName);
    this.formValue.controls['email'].setValue(user.email);
    this.formValue.controls['phoneNumber'].setValue(user.userInfo.phoneNumber);
    this.formValue.controls['state'].setValue(user.userInfo.state);
    this.formValue.controls['city'].setValue(user.userInfo.city);
    

    this.showUpdate = true;
  }


  deleteUser(user: any) {
    console.log(user.userId)
    let confirmed = confirm("Are you sure? You will not be able to recover the account.");
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
