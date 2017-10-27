import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import jQuery from 'jquery';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor() {

   }

  ngOnInit() {
    setTimeout(function() {
      $("#carouseldj").click();      
    }, 5000);



}

}
