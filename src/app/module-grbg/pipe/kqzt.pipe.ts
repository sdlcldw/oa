import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kqzt'
})
export class KqztPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == 1){
      return '正常';
    }else if(value == 2){
      return '请假';
    }else if(value == 3){
      return '迟到';
    }else if(value == 4){
      return '旷课';
    }else{
      return null;
    }
  }

}
