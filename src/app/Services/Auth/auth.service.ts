import { HttpClient } from '@angular/common/http';
import {inject, Injectable, PLATFORM_ID,InjectionToken, Inject } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { code, password,email, SignInData, SignUpData } from '../../interfaces/Data/data';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:BehaviorSubject<null|JwtPayload>=new BehaviorSubject<null|JwtPayload>(null);

  constructor(private _HttpClient:HttpClient,private _Router:Router,@Inject(PLATFORM_ID) id:Object) {
    if(isPlatformBrowser(id)){
      if(localStorage.getItem("userToken")!= null){
        this.decodeData()
        // this.veifyToken().subscribe({
        //   next:()=>{
        //     this.decodeData()
        //   },
        //   error:()=>{
        //     this.signOut()
        //   }

        // })
    }
    }
   }

  signUp(SignUpData:SignUpData):Observable<any>
  {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup",SignUpData)
  }



  signIn(SignInData:SignInData):Observable<any>
  {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin",SignInData)
  }

  decodeData(){

const token =localStorage.getItem("userToken")||"";
const decoded = jwtDecode(token);
this.userData.next(decoded);
  }

  signOut()
  {
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this._Router.navigate(["Login"])
  }


   veifyToken():Observable<any>
  {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",{
      headers:{token:localStorage.getItem("userToken")||""}})
  }
   ForgetPassword(data:email):Observable<any>
  {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",data)
  }
   Reset(data:code):Observable<any>
  {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",data)
  }
   changePassword(data:password):Observable<any>
  {
    return this._HttpClient.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",data)
  }
  

  }
