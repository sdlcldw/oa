import {Injectable, OnInit} from '@angular/core';
import { Router,CanActivate } from "@angular/router";
import * as $ from 'jquery';
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";


@Injectable()
export class LoginGuard implements CanActivate{
dataSource:Observable<any>;

constructor(private router:Router,private http:Http){
    this.dataSource = this.http.get('/oa/basic/web/index.php?r=index/islogin')
}
 canActivate(){
return this.dataSource.map((auth) => {
    let data = auth.json();
            if (data==1) {
                return true;
            }
            console.log('not authenticated');
            this.router.navigate(['login'])
            return false;
        }).first(); 
    }
}
