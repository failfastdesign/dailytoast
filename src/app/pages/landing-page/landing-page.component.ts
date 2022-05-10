// import { Component, OnInit, ContentChildren, ViewChild, Output, EventEmitter } from '@angular/core';
// import { timer } from 'rxjs';
// import { SpriteComponent } from 'src/app/components/sprite/sprite.component';
// import {fadeIn,fadeInUp} from '../../animations/animations';
// @Component({
//   selector: 'app-landing-page',
//   templateUrl: './landing-page.component.html',
//   styleUrls: ['./landing-page.component.scss'],
//   animations:[
//     fadeIn,
//     fadeInUp
//   ]
// })
// export class LandingPageComponent implements OnInit {
//   timerText: string = '';
//   timerIndex: number = 1;
//   timerArray: string[] = ['00:30','01:00','01:30','02:00','03:30','04:00','04:30','05:00','08:00','10:00','15:00'];
//   waitanim = 'wait1';
//   show:boolean = false;
//   @Output() onStart = new EventEmitter<any>();
//   @ViewChild('sprite') sprite:SpriteComponent;
//   constructor() { }
//   ngOnInit(): void {
//     this.timerText = this.timerArray[1];
//   }

//   changeAnim(){
//     this.show = !this.show;
//   }
//   setTimer($event){
//     let direction: string = $event.currentTarget.parentNode.getAttribute("data-direction");
//     if(direction == 'down'){
//       if(this.timerIndex !== 0){
//         this.timerIndex--
//       }
//     } else{
//       if(this.timerIndex !== this.timerArray.length-1){
//         this.timerIndex++
//       }
//     }
//     this.timerText = this.timerArray[this.timerIndex];
//   }
//   startDaily(){
//     this.onStart.emit(this.timerArray[this.timerIndex]);
//   }
//   nextAnim(){
//     // this.show = true;
//     this.sprite.updateSprite('wait2')
//   }
// }
