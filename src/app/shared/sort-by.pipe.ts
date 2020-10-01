import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(value: any[], order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) {
      return value;
    } // no array
    if (value.length <= 1) {
      return value;
    } // array with only one item
    if (column === '') {
      return value.sort();
    }
    if (order === 'asc') {
      return value.sort((a, b) => {
        if (typeof a[column] === 'number') {
          return a[column] - b[column];
        } else if (a[column] instanceof Array) {
          return a[column]
            .toString()
            .toLowerCase()
            .localeCompare(b[column].toString().toLowerCase());
        } else {
          return a[column].toLowerCase().localeCompare(b[column].toLowerCase());
        }
      });
    } else {
      return value.sort((a, b) => {
        if (typeof a[column] === 'number') {
          return b[column] - a[column];
        } else if (a[column] instanceof Array) {
          return b[column]
            .toString()
            .toLowerCase()
            .localeCompare(a[column].toString().toLowerCase());
        } else {
          return b[column].toLowerCase().localeCompare(a[column].toLowerCase());
        }
      });
    }
  }
}
