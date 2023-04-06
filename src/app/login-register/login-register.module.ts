import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidateForm from './helpers/validateform';
import { AuthService } from '../services/auth.service';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NgToastService } from 'ng-angular-popup';
import { AuthGuard } from '../guards/auth.guard';
import { AdminDashboardComponent } from '../components/dashboard/admin-dashboard/admin-dashboard.component';
import { UsermanagerComponent } from '../components/dashboard/admin-dashboard/usermanager/usermanager.component';
import { GamemanagerComponent } from '../components/dashboard/admin-dashboard/gamemanager/gamemanager.component';
import { AddofferComponent } from '../offers/addoffer/addoffer.component';
import { OffermanagerComponent } from '../components/dashboard/admin-dashboard/offermanager/offermanager.component';
import { UserStoreService } from '../services/user-store.service';
import { GameManagerModel } from '../components/dashboard/admin-dashboard/gamemanager/gamemanager.model';
import { GenremanagerComponent } from '../components/dashboard/admin-dashboard/genremanager/genremanager.component';
import { PlatformmanagerComponent } from '../components/dashboard/admin-dashboard/platformmanager/platformmanager.component';
import { MyOffersComponent } from '../components/dashboard/my-offers/my-offers.component';
import { MyTransactionsComponent } from '../components/dashboard/my-transactions/my-transactions.component';
import { MyProfileComponent } from '../components/dashboard/my-profile/my-profile.component';
import { MyOffersGuard } from '../components/dashboard/my-offers/my-offers.guard';
import { MyOffersEndedDetailsComponent } from '../components/dashboard/my-offers/my-offers-ended-details/my-offers-ended-details.component';
import { MyTransactionsDetailsComponent } from '../components/dashboard/my-transactions/my-transactions-details/my-transactions-details.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: "login", component: LoginComponent},
      { path: "register", component: RegisterComponent},
      { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
      { path: "myoffers", component: MyOffersComponent, canActivate: [AuthGuard]},
      { path: "myoffers/:id", canActivate: [MyOffersGuard], component: MyOffersEndedDetailsComponent},
      { path: "mytransactions/:id", canActivate: [MyOffersGuard], component: MyTransactionsDetailsComponent},
      { path: "mytransactions", component: MyTransactionsComponent, canActivate: [AuthGuard]},
      { path: "myprofile", component: MyProfileComponent, canActivate: [AuthGuard]},
      { path: "usermanager", component: UsermanagerComponent},
      { path: "gamemanager", component: GamemanagerComponent},
      { path: "offermanager", component: OffermanagerComponent},
      { path: "genremanager", component: GenremanagerComponent},
      { path: "platformmanager", component: PlatformmanagerComponent},
      { path: "addoffer", component: AddofferComponent},
      { path: "admin", component: AdminDashboardComponent, canActivate: [AuthGuard], data: {
        role: 'Admin'},
      },
      
    ]),
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [
    LoginComponent,
    RegisterComponent,
    GamemanagerComponent,
  ],
})
export class LoginRegisterModule {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  role: string = "";

  showModal!: boolean;
  registerForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private toast: NgToastService, private userStore: UserStoreService, private router: Router) { }
 

  show()
  {
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
}

hideShowPassword() {
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText ? this.type = "text" : this.type = "password";
}
// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }




// onLogin() {
//   this.submitted = true;
//   // stop here if form is invalid
//   if (this.loginForm.invalid) {
//     console.log("invalid form");
//     ValidateForm.validateFormFields(this.loginForm);
//     alert("Invalid credentials")
//       return;
//   }
//   // send object to database
//   console.log(this.loginForm.value);
//   this.auth.login(this.loginForm.value)
//   .subscribe({
//     next:(res=>{
//       alert(res.message)
//     })
//     ,error:(err=>{
//       alert(err?.error.message)
//     })
//   })
// }

// onRegister(){
//   //stop here if form is invalid
//   //if(this.registerForm.valid)
//     this.auth.register(this.registerForm.value)
//     .subscribe({
//       next: (res=>{
//         alert(res.message)
//       }),
//       error: (err=>{
//         alert(err?.error.message)
//       })
//     })
//     console.log(this.registerForm.value)
//     ValidateForm.validateFormFields(this.registerForm)
//   }


private validateFormFields(formGroup: FormGroup){
Object.keys(formGroup.controls).forEach(field=>{
  const control=formGroup.get(field);
  if(control instanceof FormControl) {
    control.markAsDirty({onlySelf:true});
    }
  if(control instanceof FormGroup){
    this.validateFormFields(control)
  }
})
}
}
 
