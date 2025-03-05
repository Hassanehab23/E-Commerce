import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CartNum:BehaviorSubject<number>=new BehaviorSubject<number>(0);
 constructor(private _HttpClient:HttpClient) {
  if(typeof localStorage !="undefined"){
    this.display().subscribe({
      next:res=>{
        this.CartNum.next(res.numOfCartItems)}
    })
  }
  
 }
  
       AddProduct(productId:string):Observable<any>
      {
        return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId:productId},
        {headers:
          {token:localStorage.getItem("userToken")||""}
        }
      )}
       display():Observable<any>
      {
        return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart",
        {headers:
          {token:localStorage.getItem("userToken")||""}
        }
      )}
      Quantity(productId:string,count:string):Observable<any>
      {
        return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count:count},
        {headers:
          {token:localStorage.getItem("userToken")||""}
        }
      )}

      RemoveProduct(productId:string):Observable<any>
      {
        return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {headers:
          {token:localStorage.getItem("userToken")||""}
        }
      )}

      Clear():Observable<any>
      {
        return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {headers:
          {token:localStorage.getItem("userToken")||""}
        }
      )}

}
