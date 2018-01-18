import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zt'
})
export class ZtPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if(value == 1){
        return '选课阶段';
    } else if(value == 2){
      return '进行中';
    }else if(value == 3){
      return '已结束';
    }else{
       return null;
    }
   
  }

}
