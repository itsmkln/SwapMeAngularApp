import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AddGenreModel } from './add-genre.model';
import { ViewGenreModel } from './view-genre.model';

@Component({
  selector: 'gts-genremanager',
  templateUrl: './genremanager.component.html',
  styleUrls: ['./genremanager.component.css']
})
export class GenremanagerComponent {
  role: string = "";
  formValue !: FormGroup;
  genres: any = [];
  genreObj: AddGenreModel = new AddGenreModel();

  constructor(private toast: NgToastService, private formBuilder: FormBuilder, private auth: AuthService, private api: ApiService, private router: Router, private userStore: UserStoreService) 
  {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      genreName: ['']
    })


    this.checkAdmin();
    this.getGenreDetails();
  }


  getGenreDetails() {
    this.api.getGenres()
    .subscribe(res=>{
      this.genres = res;
    })
  }


  addGenre() {
    this.genreObj.Name = this.formValue.value.genreName;

    this.api.AddGenre(this.genreObj)
    .subscribe(res => {
      this.toast.success({detail: "SUCCESS", summary:"Genre has been added."})
      let ref = document.getElementById('close');
      ref?.click();

      this.getGenreDetails();
      this.router.navigate(["genremanager"])
    })

  }
  
  deleteGenre(genreId: number) {
    let confirmed = confirm("Are you sure? You will not be able to recover this item.");
    if(confirmed) {
      this.api.DeleteGenreById(genreId)
      .subscribe(res=>{
        this.toast.success({detail: "SUCCESS", summary: "Genre has been removed.", duration: 2000})
        this.getGenreDetails();
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
