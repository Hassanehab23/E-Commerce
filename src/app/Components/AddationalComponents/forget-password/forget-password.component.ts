import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isLoading!:boolean;
  errmsg!:string;
  ForgetPasswordForm:FormGroup=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
    })
ResetCodeForm:FormGroup=new FormGroup({
  resetCode:new FormControl(null,[Validators.required,Validators.pattern(/[0-9]{,8} /)]),
    })
    constructor(private _AuthService:AuthService,private _Router:Router){}

    ForgetPasswordSubmit(){
      if(this.ForgetPasswordForm.valid){
        this.isLoading=true;
        this._AuthService.ForgetPassword(this.ForgetPasswordForm.value).subscribe({
          next:res=>{
            console.log(res)
            this._Router.navigate(["ResetCode"])

            this.isLoading=false;
          },
          error:err=>{
            this.errmsg=err.error.message
            console.log(err)
            this.isLoading=false;

          },
        })


      }

    }

    ResetCodeSubmit(){
      if(this.ResetCodeForm.valid){
        this.isLoading=true;
        this._AuthService.Reset(this.ForgetPasswordForm.value).subscribe({
          next:res=>{
            this.isLoading=false;
          },
          error:err=>{
            this.errmsg=err.error.message
            this.isLoading=false;

          },
        })


      }

    }


   




   

}
