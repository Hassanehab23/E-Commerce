import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  MessageError!:string;
  isLoading!:boolean;

   constructor(private _AuthService:AuthService,private _Router:Router){

    }
  LoginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8}$/)])
  })

  LoginNow(){

    if(this.LoginForm.valid){
      this.isLoading=true;
      this._AuthService.signIn(this.LoginForm.value).subscribe({
        next : res=>{
          this._Router.navigate(["Home"])
          this.isLoading=false;
          localStorage.setItem("userToken",res.token);
          this._AuthService.decodeData();
        },
        error : err=>{
          this.MessageError=err.error.message;
          this.isLoading=false;

        }
      })
    }
  }






  

}
