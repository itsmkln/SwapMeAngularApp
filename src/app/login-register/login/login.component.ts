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

hideShowPassword() {
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText ? this.type = "text" : this.type = "password";
}
// convenience getter for easy access to form fields
// get f() { return this.registerForm.controls; }


onLogin() {
  if (this.loginForm.valid) {
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.loginForm.reset();
        this.auth.storeToken(res.token);
         const tokenPayload = this.auth.decodedToken();
         this.userStore.setFullNameForStore(tokenPayload.unique_name);
         this.userStore.setRoleFromStore(tokenPayload.role)
        this.toast.success({detail: "SUCCESS", summary:res.message, duration: 2000});
        this.router.navigate(['dashboard'])
      },
    error: (err) => {
      this.toast.error({detail: "ERROR", summary: "Something went wrong!", duration: 2000});
      console.log(err);
      }
    });
  } else {
    ValidateForm.validateFormFields(this.loginForm);
    }
  }
}



  // send object to database
