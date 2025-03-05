import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  let _AuthService:AuthService=inject(AuthService)
  let _Router:Router=inject(Router)
  if(_AuthService.userData.getValue()!=null){
    return true;
  }
  _Router.navigate(["Login"])
  return false;

};
