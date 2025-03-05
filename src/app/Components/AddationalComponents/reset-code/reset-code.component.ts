import { Component } from '@angular/core';
import { ReactiveFormsModule,Validators,FormControl,FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-reset-code',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss'
})
export class ResetCodeComponent {
      isLoading!:boolean;
      errmsg!:string;
    constructor(private _AuthService:AuthService,private _Router:Router){}
  ResetCodeForm:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)]),
      })
  
      ResetCodeSubmit(){
        if(this.ResetCodeForm.valid){
          this.isLoading=true;
          this._AuthService.Reset(this.ResetCodeForm.value).subscribe({
            next:res=>{
              this._Router.navigate(["ResetPassword"])

              console.log(res)
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
  
