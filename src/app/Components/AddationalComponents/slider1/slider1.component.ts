import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider1',
  imports: [CarouselModule],
  templateUrl: './slider1.component.html',
  styleUrl: './slider1.component.scss'
})
export class Slider1Component {
    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
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

}
