import {Injectable, OnInit} from '@angular/core';
import {CanDeactivate } from "@angular/router";
import { Http,Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { GrzlComponent } from 'app/module-grbg/grzl/grzl.component';
import { TskService } from 'app/service/TskService';


@Injectable()
export class GrzlGuard implements CanDeactivate<GrzlComponent>{
    dataSource:Observable<any>;
    constructor(public http:Http,public tsk:TskService){
        this.dataSource = this.http.get('/oa/basic/web/index.php?r=grbg/grzl_jc');       
    }

    canDeactivate(component: GrzlComponent){
        return this.dataSource.map((auth) => {
            let data = auth.json();
                    if (data==2) {                 
                        return true;
                    }else{
                    this.tsk.tsk('系统检测：数据库个人资料不完整，请填写完整后再离开哦',3000);
                    return false;
                }
                }).first(); 
            }
    }


