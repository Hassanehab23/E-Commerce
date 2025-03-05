import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../Services/Brands/brands.service';
import { SearchPipe } from '../../../Pipes/Search/search.pipe';
import { FormsModule } from '@angular/forms';
import { SearchBrandsPipe } from '../../../Pipes/SearchBrands/search-brands.pipe';
@Component({
  selector: 'app-brands',
  imports: [ FormsModule, SearchBrandsPipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
      Brands!:any[];
      userInput: string = "";
      constructor(private _BrandsService:BrandsService){}  
      ngOnInit(): void {
        this._BrandsService.ShowBrands().subscribe({
          next:res=>{
            this.Brands=res.data;
          }
        })
        
      }    
    }