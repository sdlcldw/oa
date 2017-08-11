    import { Directive, ElementRef, Input } from '@angular/core';



    @Directive({ selector: '[errsrc]' })


    export class errsrcDirective {
        constructor(el: ElementRef) 
        {
            
        //    el.nativeElement.style.backgroundColor = 'yellow';
        }
    }