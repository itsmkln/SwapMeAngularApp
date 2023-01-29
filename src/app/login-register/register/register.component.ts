import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { single } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from '../helpers/validateform';
import { LoginRegisterModule } from '../login-register.module';

@Component({
  selector: 'gts-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  registerForm!: FormGroup;
  stateList: string[][] = [['Dolnośląskie'], ['Kujawsko-pomorskie'], ['Lubelskie'], ['Lubuskie'], ['Łódzkie'], ['Małopolskie'], ['Mazowieckie'], ['Opolskie'],
   ['Podkarpackie'], ['Podlaskie'], ['Pomorskie'], ['Śląskie'], ['Świętokrzyskie'], ['Warmińsko-Mazurskie'], ['Wielkopolskie'], ['Zachodniopomorskie'],];

  constructor(private formBuilder : FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    })
  }

  
  hideShowPassword() {
  this.isText = !this.isText;
  this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText ? this.type = "text" : this.type = "password";
}

  onRegister(){

  if(this.registerForm.valid){
    this.auth.register(this.registerForm.value)
    .subscribe({
      next: (res=>{
        this.toast.success({detail: "SUCCESS", summary: "User registered succesfully.", duration: 2000});
        this.registerForm.reset();
        this.router.navigate(['login']);
      }),
      error: (err=>{
        console.error(err.message)
        //this.toast.error({detail: "FAILED", summary: "Something went wrong.", duration: 2000});
      })
    })
  }else{
    ValidateForm.validateFormFields(this.registerForm)
      }
  }
}