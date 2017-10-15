import {Injectable, OnInit} from '@angular/core';
import { Router,CanActivate } from "@angular/router";
import { DataService } from './DataService';



@Injectable()
export class FpqxGuard implements CanActivate{

constructor(private router:Router,private datasv:DataService,) {
    
}
 canActivate(){   
    if(this.datasv.getfpqxdata()){
        return true;
        }else{
        this.router.navigate(['index/xtsz/jslb']); 
        return false;
        }
    }
}
