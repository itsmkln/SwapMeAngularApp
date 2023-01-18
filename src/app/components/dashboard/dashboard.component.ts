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
  
  public users: any = [];
  public fullName: string = "";
  public role: string = "";
  public username: string ="";
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService,
     private router: Router, private toast: NgToastService) {}

    ngOnInit() {
      this.api.getUsers()
      .subscribe(res =>{
        this.users = res;
      });

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });


  }

  deleteMe(username: any){
    let confirmed = confirm("Are you sure?");
    if(confirmed) {
      this.api.DeleteMe(username)
      .subscribe(res=>{
        alert("Deleted successfully");
      })
    }
  } 
  
  deleteMyAccount() {
      this.api.DeleteMe(this.username)
      .subscribe({
        next: (res) => {
          let username = this.auth.storeUsername(res.username);
          console.log("huj")
          console.log(this.auth.storeUsername(res.username));
          if (username != null) {
          this.toast.success({detail: "SUCCESS", summary:"Done", duration: 2000});
          this.auth.logout();
          this.router.navigate(['dashboard'])
          }
        },
      error: (err) => {
        this.toast.error({detail: "ERROR", summary: "Something went wrong!", duration: 2000});
        console.log(err);
        }});
    }
  }

  

