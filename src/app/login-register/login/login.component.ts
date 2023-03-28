import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import ValidateForm from '../helpers/validateform';
import { LoginRegisterModule } from '../login-register.module';

@Component({
  selector: 'gts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  error: string = "";
  showModal!: boolean;
  registerForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService, private userStore: UserStoreService) { }


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
onLogin() {
  if (this.loginForm.valid) {
    console.log(this.loginForm.value);
    localStorage.clear();
    sessionStorage.clear();
    this.auth.login(this.loginForm.value)
    .subscribe({
      next: (res) => {
        this.loginForm.reset();
        this.auth.storeToken(res.token);
         const tokenPayload = this.auth.decodedToken();
         this.userStore.setFullNameForStore(tokenPayload.unique_name);
         this.userStore.setRoleFromStore(tokenPayload.role)
        this.toast.success({detail: "SUCCESS", summary:res.message, duration: 2000});
        //refresh dashboard?
        this.router.navigate(['dashboard'])
      },
    error: (err) => {
      console.log(err);
      console.log(err.message);
      console.log(err?.error.message);
      this.toast.error({detail: "ERROR", summary:err.message, duration: 2000});
      }
    });
  } else {
    ValidateForm.validateFormFields(this.loginForm);
    }
  }


hideShowPassword() {
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText ? this.type = "text" : this.type = "password";
}
// convenience getter for easy access to form fields
// get f() { return this.registerForm.controls; }



}



  // send object to database
