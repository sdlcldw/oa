import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable()

export class TskService{
    

    constructor(){ }

    tsk(ts,sj=3000){
        $("#jgk").append("<div style='letter-spacing:2px;' id='myAlert' class='alert alert-danger fade in'><button type='button' class='close' data-dismiss='alert' aria-label='Close'>&times;</button><strong>"+ts+"</strong>");
        setTimeout("$('#myAlert').remove()",sj)
    }
    cg(ts,sj=3000){
        $("#jgk").append("<div style='letter-spacing:2px;color: #fff;background-color: #5BB85D;border-color: #499b4b;' id='myAlert' class='alert fade in'><button type='button' class='close' data-dismiss='alert' aria-label='Close'>&times;</button><strong>"+ts+"</strong>");
        setTimeout("$('#myAlert').remove()",sj)
    }

}


