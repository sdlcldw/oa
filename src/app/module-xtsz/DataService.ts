import { Injectable } from '@angular/core';

@Injectable()

export class DataService{

fpqx;
fpjs;
    constructor(){ }

    setfpqxdata(data){
        this.fpqx = data;
    }
    getfpqxdata(){
        return this.fpqx;
    }

    setfpjsdata(data){
        this.fpjs = data;
    }
    getfpjsdata(){
        return this.fpjs;
    }

}