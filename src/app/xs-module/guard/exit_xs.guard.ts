import {Injectable, OnInit} from '@angular/core';
import { Router,CanActivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExitxsGuard implements CanActivate{

dataSource:Observable<any>;
products;

constructor(private router:Router,private http:HttpClient) {
    this.dataSource = this.http.get('/oa/basic/web/index.php?r=xsindex/islogin')
}
canActivate(){      
return this.dataSource.map((data) => {
            if (data==1) {
            console.log('后端返回：'+data);
            console.log('authenticated');
            this.router.navigate(['xs/index'])
            return false;
            }
            console.log('后端返回：'+data);
            console.log('验证运行进入路由');
             return true;
        }).first(); 
    }
   
}