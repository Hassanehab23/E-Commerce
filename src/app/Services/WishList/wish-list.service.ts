import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  constructor(private _HttpClient:HttpClient) {
}


       AddProductToWishList(productId:string):Observable<any>
      {
        return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/wishlist",
        
          {productId:productId},
        {headers:
          {token:localStorage.getItem("userToken")||""}
        }
      )}
      
       DisplayProductInWishList():Observable<any>
      {
        return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/wishlist",
        {headers:
          {token:localStorage.getItem("userToken")||""}
        }
      )}

      RemoveProductFromWishList(productId:string):Observable<any>
      {
        return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {headers:
          {token:localStorage.getItem("userToken")||""}
        }
      )}
}
