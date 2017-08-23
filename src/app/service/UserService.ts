import { Injectable } from '@angular/core';

@Injectable()

export class UserService{

data;

    constructor(){ }

    setuserinfo(data){
        this.data = data;
    }
    getuserinfo(){
        return this.data;
    }

}