import { Component, OnInit } from '@angular/core';
import { WishListService } from '../../../Services/WishList/wish-list.service';
import { CartService } from '../../../Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  imports: [RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  data!: any[];
  wishlist: Set<string> = new Set(); 

  constructor(
    private _WishListService: WishListService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
    this._WishListService.DisplayProductInWishList().subscribe({
      next: res => {
        this.data = res.data;
      }
    });
  }

  addproducttocart(productId: string) {
    this._CartService.AddProduct(productId).subscribe({
      next: res => {
        this._CartService.CartNum.next(res.numOfCartItems)

        this._ToastrService.success(res.message, '', {
          progressBar: true,
          timeOut: 1000
        });
      }
    });
  }

  removeProductFromWishlist(productId: string) {
    this._WishListService.RemoveProductFromWishList(productId).subscribe({
      next: res => {
        this.wishlist.delete(productId); 
        this.data = this.data.filter(item => item._id !== productId); 
        this.updateWishlistStorage(); 
        this._ToastrService.success(res.message, '💔', { progressBar: true, timeOut: 700 });
      }
    });
  }

  loadWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    this.wishlist = new Set(savedWishlist ? JSON.parse(savedWishlist) : []);
  }

  isInWishlist(productId: string): boolean {
    return this.wishlist.has(productId);
  }

  updateWishlistStorage() {
    localStorage.setItem('wishlist', JSON.stringify(Array.from(this.wishlist)));
  }
}
