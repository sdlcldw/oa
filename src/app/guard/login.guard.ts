import {Injectable, OnInit} from '@angular/core';
import { Router,CanActivate } from "@angular/router";
import * as $ from 'jquery';
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";


@Injectable()
export class LoginGuard implements CanActivate{
dataSource:Observable<any>;
products;

constructor(private router:Router,private http:Http) {
    this.dataSource = this.http.get('/oa/basic/web/index.php?r=index/islogin')
}
 canActivate(){      
return this.dataSource.map((auth) => {
    let data = auth.json();
            if (data==1) {
                console.log('后端返回：'+data);
                console.log('验证运行进入路由');
                return true;
            }
            console.log('后端返回：'+data);
            console.log('not authenticated');
            this.router.navigate(['login'])
            return false;
        }).first(); 
    }
   
}
