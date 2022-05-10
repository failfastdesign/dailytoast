import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-about-body',
  templateUrl: './about-body.component.html',
  styleUrls: ['./about-body.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AboutBodyComponent implements OnInit {
  steps: any[] = [
    {
      imgsrc: "assets/images/about/img_01.png",
      imgalt: "Image 1",
      title:"MAKE IT <span> TASTY </span><br>FOR EVERYONE",
      description: "Gluten-free, vegan, organic, or whatever you resonate with, make sure everyone get’s a piece of toast."
    },
    {
      imgsrc: "assets/images/about/img_02.png",
      imgalt: "Image 2",
      title:"KEEP IT <span> FRESH </span><br>AND<span> LIGHT </span>",
      description: "Breakfast is served to energize, not to depleat. Did you top your toast with healthy fats? What ingredient is holding you back? "
    },
    {
      imgsrc: "assets/images/about/img_03.png",
      imgalt: "Image 3",
      title:"SKIP THE<br><span> ADDITIVES </span>",
      description: "Don't over-decorate your toast. Be concise and avoid adding ingredients for decoration. No need for more than one spoon of jam. "
    },
    {
      imgsrc: "assets/images/about/img_04.png",
      imgalt: "Image 4",
      title:"DON’T LET IT<br> GET<span> SOGGY </span>",
      description: "Encourage fellow toasters to be punctual. No one likes soggy bread. Don't let this meal exceed 15 minutes. "
    },
    {
      imgsrc: "assets/images/about/img_05.png",
      imgalt: "Image 5",
      title:"ASSEMBLE A TEAM<br> OF <span> FOODIES </span>",
      description: "Agile is not a methodology, it is a mindset. Make sure your toasters are on the same settings or someone will get burned. "
    }
 ];
  constructor() {


  }

  ngOnInit(): void {
  }

}
