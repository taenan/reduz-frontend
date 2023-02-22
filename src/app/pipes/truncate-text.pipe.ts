import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit = 90, ellipsis = '...') {
    return value && value.length > limit ? value.substring(0, limit) + ellipsis : value;
  }

}
