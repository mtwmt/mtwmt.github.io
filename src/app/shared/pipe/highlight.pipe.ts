import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: any, args: any, type: string): unknown {
    if (!args) return value;
    if (type === 'full') {
      const re = new RegExp('\\b(' + args + '\\b)', 'igm');
      value = value.replace(
        re,
        '<span class="bg-orange-500 text-white px-[1px] rounded">$1</span>'
      );
    } else {
      const re = new RegExp(args, 'igm');
      value = value.replace(
        re,
        '<span class="bg-orange-500 text-white px-[1px] rounded">$&</span>'
      );
    }
    return value;
  }
}
