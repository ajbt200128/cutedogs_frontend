import { LoginHelper } from './../../utils/login-helper';
import { ApiHandlerService } from './../../services/api-handler.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;
  valid: boolean = true;
  remember:boolean;
  constructor(private router: Router,private route:ActivatedRoute, private api:ApiHandlerService) {
   }

  ngOnInit() {
  }

  logIn(){
    if (this.username && this.password){
      let token;
      this.api.login(this.username,this.password).subscribe((res)=>{
          LoginHelper.login(res.toString(), this.remember);
          window.history.back();

      },
      (err:HttpErrorResponse)=>{
        this.valid = !(err.status === 401);
      });
    }


  }
}
