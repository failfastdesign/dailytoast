import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  router: string;
  constructor(public _router: Router) 
  {
    this.router = _router.url; 
   }

  ngOnInit(): void {
  }

}
