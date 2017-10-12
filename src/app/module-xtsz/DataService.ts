import { Injectable } from '@angular/core';

@Injectable()

export class DataService{

fpqx;

    constructor(){ }

    setfpqxdata(data){
        this.fpqx = data;
    }
    getfpqxdata(){
        return this.fpqx;
    }

}