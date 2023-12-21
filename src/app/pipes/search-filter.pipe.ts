import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(objs: any[], x: number): any[] {
    if (x == null) {
      return objs;
    }
  
    return objs.filter((obj: any) => {
      return obj.scoreOne === x || obj.scoreTwo === x;
    });
  }
  

}
