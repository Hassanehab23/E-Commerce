import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) {}

     ShowProduct():Observable<any>
    {
      return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/products")
    }
     ShowProductdetails(id:string):Observable<any>
    {
      return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

}
