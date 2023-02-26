import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'gts-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public userid: number = 0;
  public users: any = [];
  public fullName: string = "";
  public firstName: string ="";
  public role: string = "";
  public username: string ="";
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService,
     private router: Router, private toast: NgToastService) {}

    ngOnInit() {

      this.userid = this.auth.getId();

      this.api.getUsers()
      .subscribe(res =>{
        this.users = res;
      });

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getFirstNameFromStore()
    .subscribe(val=>{
      const firstNameFromToken = this.auth.getFirstNameFromToken();
      this.firstName = val || firstNameFromToken
    })

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });
    

  }

  deleteUser(id: number){
    let confirmed = confirm("Are you sure you want to delete your account?")
    if (confirmed){
      this.api.DeleteUserById(id)
      .subscribe(res=>{
        sessionStorage.clear();
        this.auth.logout();
        this.toast.success({detail: "SUCCESS", summary:"Your account has been deleted.", duration: 2000})
        this.router.navigate(['welcome'])
      })
  
  }
  
  // deleteMyAccount() {
  //     this.api.DeleteMe(this.username)
  //     .subscribe({
  //       next: (res) => {
  //         let username = this.auth.storeUsername(res.username);
  //         console.log("huj")
  //         console.log(this.auth.storeUsername(res.username));
  //         if (username != null) {
  //         this.toast.success({detail: "SUCCESS", summary:"Done", duration: 2000});
  //         this.auth.logout();
  //         this.router.navigate(['dashboard'])
  //         }
  //       },
  //     error: (err) => {
  //       this.toast.error({detail: "ERROR", summary: "Something went wrong!", duration: 2000});
  //       console.log(err);
  //       }});
    }
  

  
  }
