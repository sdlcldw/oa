import {Injectable, OnInit} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import * as $ from 'jquery';
import { TskService } from "app/service/TskService";



@Injectable()
export class QxGuard implements CanActivate{


constructor(private router:Router,private tsk: TskService) {
}
 canActivate(next:ActivatedRouteSnapshot){

    if($.cookie("qx").indexOf(next.data['role']) == -1 ){
        this.tsk.tsk('对不起，您的权限不足！');
        return false;
    }else{
return true;
}
    }
}
