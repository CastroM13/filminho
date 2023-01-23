import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toTitleCase'
})
export class ToTitleCasePipe implements PipeTransform {

  transform = (str: string) => str.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

}
