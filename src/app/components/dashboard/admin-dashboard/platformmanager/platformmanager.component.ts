import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';


@Component({
  selector: 'gts-platformmanager',
  templateUrl: './platformmanager.component.html',
  styleUrls: ['./platformmanager.component.css']
})
export class PlatformmanagerComponent {
  role: string = "";

  constructor(private toast: NgToastService, private auth: AuthService, private api: ApiService, private router: Router, private userStore: UserStoreService) 
  {}

  ngOnInit(): void {
    this.checkAdmin();
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
