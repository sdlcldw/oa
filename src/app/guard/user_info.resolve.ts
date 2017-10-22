import {Injectable, OnInit} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Http,Headers } from "@angular/http";
import { TskService } from 'app/service/TskService';
import { Observable } from 'rxjs';
import { UserService } from 'app/service/UserService';

@Injectable()
export class User_infoResolve implements Resolve<any>{
    dataSource:Observable<any>;
    constructor(private router:Router,private http:Http,private tsk:TskService,private userinfo:UserService) {
        this.dataSource = this.http.get('/oa/basic/web/index.php?r=index/getuserinfo');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.dataSource.map((auth) => {
        let data = auth.json(); 
        console.log(data);
           if(data){
            this.userinfo.setuserinfo(data);
            return data;
        }else{
            this.tsk.tsk('获取用户信息失败')
            this.router.navigate(['login']);
        }
          })
        
    }

}
