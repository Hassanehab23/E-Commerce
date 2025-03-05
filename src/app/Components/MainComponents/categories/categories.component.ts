import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../Services/Categories/categories.service';
import { FormsModule } from '@angular/forms';
import { SearchCategoriesPipe } from '../../../Pipes/SearchCategories/search-categories.pipe';


@Component({
  selector: 'app-categories',
  imports: [FormsModule,SearchCategoriesPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements   OnInit{  
    Categories!:any[];
    userInput: string = "";
    constructor(private _CategoriesService:CategoriesService){}  
    ngOnInit(): void {
      this._CategoriesService.ShowCategories().subscribe({
        next:res=>{
          this.Categories=res.data;
        }
      })
      
    }    
  }

