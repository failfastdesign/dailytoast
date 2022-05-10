import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  router: string;
  constructor(private _router: Router) 
  {
    this.router = _router.url; 
   }

  ngOnInit(): void {
  }

}
