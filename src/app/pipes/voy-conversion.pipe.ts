import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voyConversion'
})
export class VoyConversionPipe implements PipeTransform {

  transform(ch: string): any {

    let vowels = ["a","e","i","u","o","y","A","E","I","U","O","Y"];
    let result:string = '';
    for (let i = 0; i < ch.length; i++) {
    let x: string = ch[i];
    for (let j = 0; j < vowels.length; j++) {
  if (ch[i] == vowels[i]) {
    x ="*";
    break;
  }
  
}

result = result + x;
    }
  }
}

