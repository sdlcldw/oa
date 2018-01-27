import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xjpj'
})
export class XjpjPipe implements PipeTransform {

  transform(value: number): any {
    if(value == 5){
      return '非常优秀';
    }else if(value == 4){
      return '优秀';
    }else if(value == 3){
      return '良好';
    }else if(value == 2){
      return '一般';
    }else if(value == 1){
      return '较差';
    }
  }

}
