import { Component, OnInit } from '@angular/core';
import {pagePushUp, fadeIn} from '../../animations/animations';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  animations:[pagePushUp,fadeIn]
})
export class AboutPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
