import { Injectable, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { TskService } from "app/service/TskService";
import { UserService } from 'app/service/UserService';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';



@Injectable()
export class QxGuard implements CanActivate {

    dataSource: Observable<any>;

    constructor(private http: Http, private router: Router, private tsk: TskService, private userinfo: UserService) {
        this.dataSource = this.http.get('/oa/basic/web/index.php?r=index/getuserinfo');
    }


    canActivate(next: ActivatedRouteSnapshot) {
        // console.log("QxGuard信息:" + next.parent.url + '/*');
        if (!this.userinfo.getuserinfo()) {
            this.dataSource.map((auth) => {
                let data = auth.json();
                if (data) {
                    this.userinfo.setuserinfo(data);
                    let qx = this.userinfo.getuserinfo().qx;
                    console.log("QxGuard信息:" + qx);
                } else {
                    this.tsk.tsk('获取用户信息失败')
                    this.router.navigate(['login']);
                }
            })
        } else {

            let qx = this.userinfo.getuserinfo().qx;
            console.log("QxGuard信息:" + qx + "想要进入的路由："+ '/' + next.url+(qx.indexOf(next.parent.url + '/*') == -1) + (qx.indexOf('/' + next.url) == -1));
            //  return true;
            if (qx.indexOf(next.parent.url + '/*') == -1) {
                if (qx.indexOf('/' + next.url) == -1) {
                    this.tsk.tsk('对不起，您的权限不足！');
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }




        }



    }
}

