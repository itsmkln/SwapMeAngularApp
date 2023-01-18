import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidateForm from './helpers/validateform';
import { AuthService } from '../services/auth.service';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NgToastService } from 'ng-angular-popup';
import { AuthGuard } from '../guards/auth.guard';
import { AdminDashboardComponent } from '../components/dashboard/admin-dashboard/admin-dashboard.component';


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
      { path: "admin", component: AdminDashboardComponent, canActivate: [AuthGuard], data: {
        role: 'Admin'
      }},
    ]),
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [
    LoginComponent,
    RegisterComponent,
  ],
})
export class LoginRegisterModule {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  showModal!: boolean;
  registerForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private toast: NgToastService) { }
 

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
 
