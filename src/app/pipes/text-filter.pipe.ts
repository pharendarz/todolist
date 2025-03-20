import { Pipe, PipeTransform } from '@angular/core';
// todo enchance to get array of fields and search by all of them
@Pipe({
  name: 'textFilter',
})
export class TextFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, field: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) =>
      item[field].toLowerCase().includes(searchText),
    );
  }
}
