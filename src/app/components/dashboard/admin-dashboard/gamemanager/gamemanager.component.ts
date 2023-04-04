import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { GameManagerModel } from './gamemanager.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddGameModel } from './add-game.model';

@Component({
  selector: 'gts-gamemanager',
  templateUrl: './gamemanager.component.html',
  styleUrls: ['./gamemanager.component.css']
})


export class GamemanagerComponent implements OnInit {
  games: any = [];
  genres: any = [];
  role: string = "";
  formValue !: FormGroup;
  gameObj : AddGameModel = new AddGameModel();

  @Input() receive !: string;


  // public displayedColumns = ['col1', 'col2'];
  // data: GameManagerModel[] = [];


  constructor(private api: ApiService, private userStore: UserStoreService, private auth: AuthService, private router: Router, private toast: NgToastService, private http: HttpClient, private formBuilder: FormBuilder) {}

  

  ngOnInit(): void {
    this.checkAdmin();

    this.formValue = this.formBuilder.group({
      gameName: [''],
      genreId: [''],
    })

    // this.api.GetGames().subscribe(x => {
    //   this.data = x;
    //   console.log(this.data);
    // })

    this.api.getGamesView()
    .subscribe(res =>{
      this.games = res;
    });

    this.api.getGenres()
    .subscribe(res =>{
      this.genres = res;
    })

  }

  addGame(){ //sets genreId based on genreName
        this.gameObj.Name = this.formValue.value.gameName;
        this.gameObj.GenreId = this.formValue.value.genreId;
    
        this.api.AddGame(this.gameObj)
        .subscribe(res => {
          this.toast.success({detail: "SUCCESS", summary:"Game has been added."})
          let ref = document.getElementById('close');
          ref?.click();

          this.getGameDetails();
          this.router.navigate(["gamemanager"])
        })
      }
    
  deleteGame(gameId: number) {
    let confirmed = confirm("Are you sure? You will not be able to recover the account.");
    if(confirmed) {
      this.api.DeleteGameById(gameId)
      .subscribe(res=>{
        this.toast.success({detail: "SUCCESS", summary: "Game has been removed.", duration: 2000})
        this.getGameDetails();
    });
  }
}



  getGameDetails() {
      this.api.getGamesView()
      .subscribe(res=>{
        this.games = res;
      })
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
