import {Injectable, OnInit} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TskService } from '../../service/TskService';
import { XsService } from '../service/XsService';



@Injectable()
export class Xs_infoResolve implements Resolve<any>{
    dataSource:Observable<any>;
    constructor(private router:Router,private http:HttpClient,private tsk:TskService,private xsinfo:XsService) {
        this.dataSource = this.http.get('/oa/basic/web/index.php?r=xsindex/getxsinfo');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.dataSource.map((data) => {
           if(data){
            this.xsinfo.setuserinfo(data);
            return data;
        }else{
            this.tsk.tsk('获取学生登录信息失败')
            this.router.navigate(['xs/login']);
        }
          })
        
    }

}
