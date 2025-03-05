import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCategories'
})
export class SearchCategoriesPipe implements PipeTransform {

  transform(  Categories: any[], userWord: string): any[]{

    return Categories?.filter(function(Category)
  {
    return Category?.name.toLowerCase().includes(userWord.toLowerCase())
  });
  }
  }
