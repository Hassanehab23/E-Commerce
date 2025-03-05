import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBrands'
})
export class SearchBrandsPipe implements PipeTransform {

  transform(  Brands: any[], userWord: string): any[]{

    return Brands?.filter(function(Brand)
  {
    return Brand?.name.toLowerCase().includes(userWord.toLowerCase())
  });
  }

}
