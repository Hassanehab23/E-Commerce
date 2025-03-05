import { Component } from '@angular/core';
import { ReactiveFormsModule,Validators,FormControl,FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

      isLoading!:boolean;
      errmsg!:string;
    constructor(private _AuthService:AuthService,private _Router:Router){}
  ResetPasswordForm:FormGroup=new FormGroup({
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8}$/)]),
    email:new FormControl(null,[Validators.required,Validators.email]),

      })
  
      ResetPasswordSubmit(){
        if(this.ResetPasswordForm.valid){
          this.isLoading=true;
          this._AuthService.changePassword(this.ResetPasswordForm.value).subscribe({
            next:res=>{
              console.log(res)
              this._Router.navigate(["Home"])

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

