import { Component } from '@angular/core';
import { AbstractControl, FormControl,FormGroup,PatternValidator,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  erroemessage!:string;
  isLoading!:boolean;


  constructor(private _AuthService:AuthService,private _Router:Router){


  }

  RegisterForm:FormGroup=new FormGroup({

    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },this.RePasswordValid)


  RegisterNow(){
    this.isLoading=true;
    if(this.RegisterForm.valid){
      this._AuthService.signUp(this.RegisterForm.value).subscribe({
        next:res=>{
          console.log(res)
          this._Router.navigate(["Home"])
          this.isLoading=false;
          localStorage.setItem("userToken",res.token);
          this._AuthService.decodeData();
 
        },
        error:err=>{
          this.erroemessage=err.error.message;
          this.isLoading=false;

        }
      })
    }
  }



  RePasswordValid(x:AbstractControl){
    if(x.get("rePassword")?.value===x.get("password")?.value){
      return null

    }
    else{

      x.get("rePassword")?.setErrors({missmatch:true});
      return {missmatch:true}


    }

  }
}
