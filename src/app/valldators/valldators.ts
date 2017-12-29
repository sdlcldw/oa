import { FormControl } from "@angular/forms";

//日期格式xxxx-xx-xx
export function dateValidator(date:FormControl):any{
    let value = (date.value || '')+'';
    var myreg = /^(\d{4})-(\d{2})-(\d{2})$/;
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