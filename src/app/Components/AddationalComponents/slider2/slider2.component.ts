import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../Services/Categories/categories.service';
@Component({
  selector: 'app-slider2',
  imports: [CarouselModule],
  templateUrl: './slider2.component.html',
  styleUrl: './slider2.component.scss'
})
export class Slider2Component {
  Categories!:any[];
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
            items: 7
          }
        },
        nav: true,
        autoplay:true
      }
      constructor(private _CategoriesService:CategoriesService){
        this._CategoriesService.ShowCategories().subscribe({
          next:res=>{
            this.Categories=res.data;
          }
        })
        
      }
  
  }
