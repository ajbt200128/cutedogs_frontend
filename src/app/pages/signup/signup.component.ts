import { FormControl } from '@angular/forms/';
import { DataResponse } from './../../utils/data';
import { Validators } from '@angular/forms';
import { LoginHelper } from './../../utils/login-helper';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';
import { ApiHandlerService } from 'app/services/api-handler.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms/';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username:string;
  password:string = '';
  passwordVerify:string;
  name:string;
  valid: boolean = true;
  validPassword: boolean = false;
  formGroup:FormGroup = new FormGroup({
    nameValidator:new FormControl('',[Validators.required]),
    usernameValidator: new FormControl('',[
      Validators.pattern('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'),
      Validators.required
    ]),
    passwordValidator: new FormControl('',[
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
      Validators.required
    ]),
    passwordVerifyValidator:new FormControl()
  })

  constructor(public api:ApiHandlerService,public router:Router) {

  }

  ngOnInit() {
  }
  signUp(){
    if (this.formGroup.valid && this.passwordVerify === this.password) {
      this.api.signup({uuid:UUID.UUID(), dogs: [], name: this.name, username: this.username},this.password).subscribe(res=>{
        if (res.status === 'SUCCESS') {
          this.api.login(this.username,this.password).subscribe((res)=>{
            LoginHelper.login(res.toString());
            this.router.navigate(['/mydogs']);
        });
        }else{
          this.formGroup.controls['usernameValidator'].setErrors({usernameTaken: true});
        }
      }, (err:DataResponse<any>) =>{
        console.log("reeee")
        this.formGroup.controls['usernameValidator'].setErrors({usernameTaken: true});
        console.log(this.getUsernameError());
        this.valid = false;
      })
    }
  }
  getUsernameError():string{
    if(this.formGroup.controls['usernameValidator'].errors){
      if (this.formGroup.controls['usernameValidator'].errors['required']){
        return 'Please enter a username';
      }else if (this.formGroup.controls['usernameValidator'].errors['pattern']){
        return 'Username must be alphanumerical and 8-20 characters long';
      }else if(this.formGroup.controls['usernameValidator'].errors['usernameTaken']||!this.valid){
        return 'Username taken';
      }
    }
  }
  getPasswordError():string{
    console.log(JSON.stringify(this.formGroup.controls['passwordValidator'].errors));
    if(this.formGroup.controls['passwordValidator'].errors){
      if(this.formGroup.controls['passwordValidator'].errors['pattern']){
        return 'Password must have upper and lower case letters, and numbers';
      }else if (this.formGroup.controls['passwordValidator'].errors['required']){
        return 'Please enter a password';
      }
    }
  }

  checkPassword() {
    let validP = this.passwordVerify===this.password;
    if (!validP){
      this.formGroup.controls['passwordVerifyValidator'].setErrors({matching: true});
    }else{
      this.formGroup.controls['passwordVerifyValidator'].setErrors(null);
    }
    return this.passwordVerify===this.password;
  }
}
