import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable()

export class TskService{


    constructor(){ }

    tsk(ts){
        $("#jgk").append("<div style='letter-spacing:2px;' id='myAlert' class='alert alert-danger fade in'><button type='button' class='close' data-dismiss='alert' aria-label='Close'>&times;</button><strong>"+ts+"</strong>");
        setTimeout("$('#myAlert').remove()",2000)
    }
  

}


