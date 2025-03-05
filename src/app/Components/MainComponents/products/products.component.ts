import { Component, OnInit } from '@angular/core';
import { LowerCasePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../Services/Cart/cart.service';
import { ProductsService } from '../../../Services/Products/products.service';
import { SearchPipe } from '../../../Pipes/Search/search.pipe';
import { WishListService } from '../../../Services/WishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [NgClass, LowerCasePipe, FormsModule, SearchPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {  
  Products!: any[];
  name: string = "Hassan";
  date: Date = new Date();
  userInput: string = "";
  wishlist: Set<string> = new Set(); 

  constructor(
    private _WishListService: WishListService,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
    this._ProductsService.ShowProduct().subscribe({
      next: res => {
        this.Products = res.data;
      }
    });
  }

  addproducttocart(productId: string) {
    this._CartService.AddProduct(productId).subscribe({
      next: res => {
        this._CartService.CartNum.next(res.numOfCartItems)

        this.toastr.success(res.message, '', { progressBar: true, timeOut: 700 });
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

  toggleWishlist(productId: string) {
    if (this.isInWishlist(productId)) {
      this._WishListService.RemoveProductFromWishList(productId).subscribe({
        next: res => {
          this.wishlist.delete(productId);
          this.updateWishlistStorage();
          this.toastr.success(res.message, '💔', { progressBar: true, timeOut: 700 });
        }
      });
    } else {
      this._WishListService.AddProductToWishList(productId).subscribe({
        next: res => {
          this.wishlist.add(productId);
          this.updateWishlistStorage();
          this.toastr.success(res.message, '❤️', { progressBar: true, timeOut: 700 });
        }
      });
    }
  }

  updateWishlistStorage() {
    localStorage.setItem('wishlist', JSON.stringify(Array.from(this.wishlist)));
  }
}
