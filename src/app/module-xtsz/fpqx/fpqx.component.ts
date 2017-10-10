import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-fpqx',
  templateUrl: './fpqx.component.html',
  styleUrls: ['./fpqx.component.css']
})
export class FpqxComponent implements OnInit {
public data: any;
  constructor(public routeInfo: ActivatedRoute,public router:Router) { }

  ngOnInit() {
    this.data = this.routeInfo.snapshot.queryParams['data'];
  }

  ok(){
    this.router.navigate(['index/xtsz/jslb']);
  }


}


