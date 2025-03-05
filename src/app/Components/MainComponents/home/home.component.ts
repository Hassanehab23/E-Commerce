import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common'; 
import { LowerCasePipe } from '@angular/common';
import { SearchPipe } from '../../../Pipes/Search/search.pipe';
import { CartService } from '../../../Services/Cart/cart.service';
import { ProductsService } from '../../../Services/Products/products.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Slider1Component } from '../../AddationalComponents/slider1/slider1.component';
import { Slider2Component } from '../../AddationalComponents/slider2/slider2.component';
import { WishListService } from '../../../Services/WishList/wish-list.service';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, LowerCasePipe, FormsModule, SearchPipe, Slider1Component, Slider2Component, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  Products!: any[];
  name: string = "Hassan";
  date: Date = new Date();
  userInput: string = "";
  wishlist: Set<string> = new Set(); 
  isLogin: boolean = false;

  constructor(
    private _ProductsService: ProductsService,
    private _WishListService: WishListService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private _AuthService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
    this.showproduct();
    this._AuthService.userData.subscribe(res => {
      this.isLogin = res != null;
    });
  }

  showproduct() {
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
        this.toastr.success(res.message, '', { progressBar: true, timeOut: 1000 });
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
