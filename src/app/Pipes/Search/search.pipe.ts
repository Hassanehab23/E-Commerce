import { Pipe, PipeTransform } from '@angular/core';
import { producerAccessed } from '@angular/core/primitives/signals';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(Products: any[], userWord: string): any[]{

    return Products?.filter(function(Product)
  {
    return Product?.title.toLowerCase().includes(userWord.toLowerCase())
  });
  }

}