import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../Services/Products/products.service';
import { CartService } from '../../../Services/Cart/cart.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    autoplay:true
  }

  Product!: any;
  Id!: string;
  constructor(
    private _ProductsService: ProductsService,
    private toastr: ToastrService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this.showproductdetail();
  }

  showproductdetail() {
    this._ActivatedRoute.params.subscribe({
      next: res => {
        this.Id = res['id'];
        if (this.Id) {
          this._ProductsService.ShowProductdetails(this.Id).subscribe({
            next: product => {
              this.Product = product;
              console.log(this.Product)
            }
          });
        }
      }
    });
  }

  addproducttocart(productId: string) {
    this._CartService.AddProduct(productId).subscribe({
      next: res => {
        this._CartService.CartNum.next(res.numOfCartItems)

        this.toastr.success(res.message, '', {
          progressBar: true,
          timeOut: 1000
        });
      },
    });
  }
}
