import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { GameManagerModel } from './gamemanager.model';

@Component({
  selector: 'gts-gamemanager',
  templateUrl: './gamemanager.component.html',
  styleUrls: ['./gamemanager.component.css']
})
export class GamemanagerComponent implements OnInit {
  games: any = [];
  formValue !: FormGroup;
  gameObj : GameManagerModel = new GameManagerModel();
  role: string = "";

  constructor(private api: ApiService, private userStore: UserStoreService, private auth: AuthService, private router: Router, private toast: NgToastService) { }

  

  ngOnInit(): void {
    this.checkAdmin();

    this.api.getGames()
    .subscribe(res =>{
      this.games = res;
    });

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
