import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat',
  standalone: true,
})
export class MoneyFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (!value && value !== 0) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
