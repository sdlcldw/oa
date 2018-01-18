import { FormControl } from "@angular/forms";

//日期格式Sat Jan 13 2018 12:18:48 GMT+0800
export function dateValidator(date:FormControl):any{
    let value = (date.value || '')+'';
    var myreg = /^([a-zA-Z]{3})\s([a-zA-Z]{3})\s(\d{2})\s(\d{4}).*/;
    let valid = myreg.test(value);
    return valid ? null : {date:true};
}

//非负整数
export function zzsValidator(data:FormControl):any{
    let value = (data.value || '')+'';
    var myreg = /^\d+$/;
    let valid = myreg.test(value);
    return valid ? null : {zzs:true};
}
// 验证非零的正整数： 
export function flzzsValidator(data:FormControl):any{
    let value = (data.value || '')+'';
    var myreg = /^\+?[1-9][0-9]*$/;
    let valid = myreg.test(value);
    return valid ? null : {flzzs:true};
}