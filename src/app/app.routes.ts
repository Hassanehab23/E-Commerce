import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './Components/MainComponents/home/home.component';
import { CartComponent } from './Components/MainComponents/cart/cart.component';
import { authGuard } from './Guards/Auth/auth.guard';
import { WishListComponent } from './Components/MainComponents/wish-list/wish-list.component';
import { CategoriesComponent } from './Components/MainComponents/categories/categories.component';
import { BrandsComponent } from './Components/MainComponents/brands/brands.component';
import { ProductsComponent } from './Components/MainComponents/products/products.component';
import { NotFoundComponent } from './Components/MainStructure/not-found/not-found.component';
import { ProductDetailsComponent } from './Components/AddationalComponents/product-details/product-details.component';
import { ChangePasswordComponent } from './Components/AddationalComponents/change-password/change-password.component';
import { ResetPasswordComponent } from './Components/AddationalComponents/reset-password/reset-password.component';
import { ResetCodeComponent } from './Components/AddationalComponents/reset-code/reset-code.component';
import { ForgetPasswordComponent } from './Components/AddationalComponents/forget-password/forget-password.component';
import { RegisterComponent } from './Components/MainComponents/register/register.component';
import { LoginComponent } from './Components/MainComponents/login/login.component';
import { RenderMode } from '@angular/ssr';


export const routes: Routes = [
    {path:"", redirectTo:"Home",pathMatch:'full',title:".E-Commerce/Home"},
    {path:"Home",component:HomeComponent,title:".E-Commerce/Home"},
    {path:"Cart",component:CartComponent,canActivate:[authGuard],title:".E-Commerce/Cart"},
    {path:"WishList",component:WishListComponent,title:".E-Commerce/WishList"},
    {path:"Categories",component:CategoriesComponent,title:".E-Commerce/Categories"},
    {path:"Brands",component:BrandsComponent,title:".E-Commerce/Brands"},
    {path:"Products",component:ProductsComponent,title:".E-Commerce/Products"},
    {path:"Login",component:LoginComponent,title:".E-Commerce/Login"},
    {path:"Register",component:RegisterComponent,title:".E-Commerce/Register"},
    {path:"ForgetPassword",component:ForgetPasswordComponent,title:".E-Commerce/ForgetPassword"},
    {path:"ResetCode",component:ResetCodeComponent,title:".E-Commerce/ResetCode"},
    {path:"ResetPassword",component:ResetPasswordComponent,title:".E-Commerce/ResetPassword"},
    {path:"ChangePassword",component:ChangePasswordComponent,title:".E-Commerce/ChangePassword"},
    {path: 'ProductDetails/:id',component: ProductDetailsComponent,data: { RenderMode:'no-prerender' }},
    {path:"**",component:NotFoundComponent,title:".E-Commerce/Error404"}
];
