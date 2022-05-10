import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourhide'
})
export class HourhidePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const round = args[0] || false;
    const parts = value.split(':');
    if (parts.length && parts[0] === '00'){
      value =  `${parts[1]}:${parts[2]}`;
    }
    if (round){
      value = ('0' + ((Number(parts[0]) * 60) + Number(parts[1])) ).slice(-2) + ':' + parts[2];
    }
    return value;
  }

}
