import {Injectable, OnInit} from '@angular/core';
import { Router,CanActivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class LoginxsGuard implements CanActivate{
dataSource:Observable<any>;

constructor(private router:Router,private http:HttpClient){
    this.dataSource = this.http.get('/oa/basic/web/index.php?r=xsindex/islogin')
}
 canActivate(){
return this.dataSource.map((data) => {
            if (data==1) {
                return true;
            }
            console.log('not authenticated');
            this.router.navigate(['xs/login'])
            return false;
        }).first(); 
    }
}
