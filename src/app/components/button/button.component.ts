import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SoundService } from '../../services/sound.service';
import {Howl, Howler} from 'howler';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: string;
  @Input() classes: string;
  @Input() btnSound: string = null;
  @Input() icon: boolean = false;
  @Input() iconClass: string;
  @Input() routLink: string = '#';
  @Output() onClick = new EventEmitter<any>();
  buttonSound:any;
  isSound:boolean = true;

  constructor( private soundService:SoundService) { }

  ngOnInit(): void {
    // this.changeSrc(this.btnSound)
    this.initAudio();
    this.soundService.getIsSound().subscribe((isSound)=>{
      this.isSound=isSound,
      (this.isSound)? this.buttonSound.mute(false):this.buttonSound.mute(true);
    });
  }

  onClickButton() {
    if(this.btnSound !== null){
      this.buttonSound.play();
    }
    this.onClick.emit(event);
  }
  initAudio(){
    if(this.btnSound){
      this.buttonSound = new Howl({
        src:'assets/sounds/'+this.btnSound,
        autoplay: false,
        format:'mp3',
        loop: false,
        volume: 0.55,
        onend: function() {

        }
      })
    }

  }
  // changeSrc(newSrc) {
  //   let self = this;
  //   self.unload();
  //   self._src = newSrc;
  //   self.load();
  // }
}
