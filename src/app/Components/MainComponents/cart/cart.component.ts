import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../Services/Cart/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  data!:any;
  constructor(private _CartService:CartService,private toastr:ToastrService){}
    ngOnInit(): void {
      this._CartService.display().subscribe({
        next:res=>{
          this.data=res.data;
        }
      })
      
    }

    Add(productId:string,count:number): void {
      this._CartService.Quantity(productId,count.toString()).subscribe({
        next:res=>{
          this.data=res.data;
        }
      })
      
    }

    Remove(productId:string,count:number): void {
      this._CartService.Quantity(productId,count.toString()).subscribe({
        next:res=>{
          this.data=res.data;
          if(count==0){
            this._CartService.CartNum.next(res.numOfCartItems)


            

          }
        }
      })
      
    }

    removeProduct(productId:string): void {
      this._CartService.RemoveProduct(productId).subscribe({
        next:res=>{
          this._CartService.CartNum.next(res.numOfCartItems)

          this.data=res.data;
          this.toastr.success("Product Removed Successfully", '',{
            progressBar:true,
            timeOut:1000
          });  
        }
      })
      
    }
    
    clear(): void {
      this._CartService.Clear().subscribe({
        next:res=>{
          this._CartService.CartNum.next(0)

          this.data.totalCartPrice=0;
          this.data.products=[];
          this.toastr.success(res.message, '',{
            progressBar:true,
            timeOut:1000
          });        }
      })
      
    }
    
}
