import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, field: string, searchTerm: any): any {
    searchTerm = searchTerm?.toString()
    if (value && field && searchTerm) {
      return value.filter((e: any) => (String(e[field])).toLowerCase().includes((String(searchTerm)).toLowerCase()));
    }
    else {
      return value;
    }
  }

}
