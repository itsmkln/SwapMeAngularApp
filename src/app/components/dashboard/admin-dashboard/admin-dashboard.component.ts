import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'gts-admin',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService, private router: Router, private toast: NgToastService) { }
  public users: any;
  public role: string = "";

  ngOnInit(): void {

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
