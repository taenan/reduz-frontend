import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datePt'
})
export class DatePtPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const datePipe = new DatePipe('pt');
    return datePipe.transform(value, 'dd/MM/yyyy HH:mm:ss');
  }

}
