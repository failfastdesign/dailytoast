import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {Howl, Howler} from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  public isSound = new BehaviorSubject(true);
  isSoundPlay:boolean = true
  constructor() { }
  toggleSound(){
    this.isSound.next(!this.isSound.getValue());
    this.isSoundPlay = !this.isSoundPlay;
    let buttonSound = new Howl({
      src:(this.isSoundPlay)?"assets/sounds/Button-Up.mp3":"assets/sounds/Button-Down.mp3",
      autoplay: false,
      format:'mp3',
      loop: false,
      volume: 1,
      onend: function() {

      }
    })
    buttonSound.play();
  }
  getIsSound(): Observable<boolean>{
    return this.isSound;
  }
}
