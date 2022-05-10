import { Component, OnInit, ContentChildren, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AssetLoaderService, AssetType } from 'src/app/modules/asset-loader/asset-loader.service';
import { fadeIn, fadeInUp, fadeOut, quoteState, progressFadeState,  } from '../../animations/animations';
import { timer } from 'rxjs';
import { Howl, Howler } from 'howler';
import { SpriteComponent } from 'src/app/components/sprite/sprite.component';
import { SoundService } from '../../services/sound.service';
@Component({
  selector: 'app-loader-page',
  templateUrl: './loader-page.component.html',
  styleUrls: ['./loader-page.component.scss'],
  animations: [
    fadeIn,
    fadeInUp,
    fadeOut,
    quoteState,
    progressFadeState
  ]
})
export class LoaderPageComponent implements OnInit, OnDestroy {
  public progress: number = 0; // progress of loader
  timerText: string = '';
  timerIndex: number = 1;
  dailyStarted: boolean = false;
  bgMusic: any;
  isSound: boolean = true;
  isLoaderbar: boolean = true;
  unit:string='min';
  _data:any;
  timerArray: string[] = ['00:00:30', '00:01:00', '00:01:30', '00:02:00', '00:02:30', '00:03:00', '00:03:30', '00:04:00', '00:04:30', '00:05:00', '00:08:00', '00:10:00', '00:15:00'];
  waitanim = 'wait1';
  show: boolean = false;
  quotes = [
    "NEVER WORK BEFORE BREAKFAST",
    "DON'T BURN YOUR PROJECT BUDGET",
    "KEEP IT LIGHT, FRESH AND SKIP ADDITIVES",
    "MAKE IT TASTY FOR EVERYONE",
    "BE PUNCTUAL, DON'T LET IT GET SOGGY"
  ]
  quoteindex = -1;
  quoteIntervel;
  @Output() onStart = new EventEmitter<any>();
  @ViewChild('sprite') sprite: SpriteComponent;
  constructor(private assetLoader: AssetLoaderService, private soundService: SoundService) { }

  ngOnInit(): void {
    // adding files to loader queue
    // images
    document.querySelector('html').style.height = '100%';
    document.querySelector('body').style.height = '100%';
    this.initAudio();
    this.soundService.getIsSound().subscribe((isSound) => {
      this.isSound = isSound,
        (this.isSound) ? this.bgMusic.mute(false) : this.bgMusic.mute(true);
    });
    this.assetLoader.loadImage("zen", "assets/images/Toast-Zen-Toaster02.png");
    this.assetLoader.loadImage("zenShadow", "assets/images/Toast-Zen-Shadow02.png");
    this.assetLoader.loadImage("failfastLogo", "assets/images/bt_failfast.svg");
    this.assetLoader.loadImage("gameLogo", "assets/images/img_title.svg");
    this.assetLoader.loadImage("toast_avocado", "assets/images/t_avocado.png");
    this.assetLoader.loadImage("toast_burnned", "assets/images/t_burned.png");
    this.assetLoader.loadImage("toast_eggs", "assets/images/t_eggs.png");
    this.assetLoader.loadImage("toast_honey", "assets/images/t_honey.png");
    this.assetLoader.loadImage("toast_jam", "assets/images/t_jam.png");
    this.assetLoader.loadImage("toast_raw", "assets/images/t_raw.png");
    this.assetLoader.loadImage("toast_regular", "assets/images/t_regular.png");
    this.assetLoader.loadImage("toast_superburned", "assets/images/t_superburned.png");
    this.assetLoader.loadImage("toast_tuna", "assets/images/t_tuna.png");
    this.assetLoader.loadImage("pause_bad", "assets/images/pause/img_bad.png");
    this.assetLoader.loadImage("pause_dope", "assets/images/pause/img_dope.png");
    this.assetLoader.loadImage("pause_fine", "assets/images/pause/img_fine.png");
    this.assetLoader.loadImage("pause_good", "assets/images/pause/img_good.png");
    this.assetLoader.loadImage("pause_scary", "assets/images/pause/img_scary.png");

    // altas
    this.assetLoader.loadAltas("wait1", "assets/images/toast/wait1/1x/toast-wait1.png", 'assets/images/toast/wait1/1x/toast-wait1.json');
    this.assetLoader.loadAltas("wait2", "assets/images/toast/wait2/1x/toast-wait2.png", 'assets/images/toast/wait2/1x/toast-wait2.json');
    this.assetLoader.loadAltas("wait3", "assets/images/toast/wait3/1x/toast-wait3.png", 'assets/images/toast/wait3/1x/toast-wait3.json');
    this.assetLoader.loadAltas("shoot", "assets/images/toast/shoot/1x/toast-shoot.png", 'assets/images/toast/shoot//1x/toast-shoot.json');
    this.assetLoader.loadAltas("ready", "assets/images/toast/ready/1x/toast-ready.png", 'assets/images/toast/ready/1x/toast-ready.json');

    // audio
    this.assetLoader.loadAudio('button_big', 'assets/sounds/Button-Big.mp3');
    this.assetLoader.loadAudio('button_down', 'assets/sounds/Button-Down.mp3');
    this.assetLoader.loadAudio('button_up', 'assets/sounds/Button-Up.mp3');
    this.assetLoader.loadAudio('button_next', 'assets/sounds/Effect-Next02.mp3');
    this.assetLoader.loadAudio('effect_state_change', 'assets/sounds/Effect-state_change01.mp3');
    this.assetLoader.loadAudio('effect_ready', 'assets/sounds/Effect-Gong01.mp3');



    // intiating asset fecthing from server
    // returns progress from 0 to 100. incremented by finishing
    // each items in the queue
    this.assetLoader.startFetching().subscribe(progress => {
      this.progress = progress;
      if(progress == 100){
        clearInterval(this.quoteIntervel);
        setTimeout(()=>{
          this.isLoaderbar = false;
        },100)
      }
    });

    this.timerText = this.timerArray[1];

    setTimeout(() => {
      this.quoteindex++;
      this.quoteIntervel = setInterval(() => {
        this.quoteindex++;
          if (this.quoteindex == this.quotes.length) {
            this.quoteindex = 0;
          }
        }, 4000);
    },0);
  }
  changeAnim() {
    this.show = !this.show;
  }
  setTimer($event) {
    let direction: string = $event.currentTarget.parentNode.getAttribute("data-direction");
    if (direction == 'down') {
      if (this.timerIndex !== 0) {
        this.timerIndex--
      }
    } else {
      if (this.timerIndex !== this.timerArray.length - 1) {
        this.timerIndex++
      }
    }
    this.timerText = this.timerArray[this.timerIndex];
    (this.timerIndex == 0)? this.unit='sec':this.unit='min';

  }
  startDaily() {
    this._data = {
      time:this.timerArray[this.timerIndex],
      unit:this.unit
    }
    this.onStart.emit(this._data);
  }
  nextAnim() {
    // this.show = true;
    this.sprite.updateSprite('wait2');
  }

  ngOnDestroy() {
    clearInterval(this.quoteIntervel);
    this.bgMusic.stop();
    this.bgMusic.unload();
    document.querySelector('html').style.height = 'auto';
    document.querySelector('body').style.height = 'auto';
  }
  initAudio() {
    this.bgMusic = new Howl({
      src: 'assets/sounds/Music-Clock.mp3',
      autoplay: true,
      format: 'mp3',
      loop: true,
      volume: 0.9,
      onend: function () {

      },
    });
    this.bgMusic.play()
    this.bgMusic.once('play',()=>{
      this.bgMusic.fade(0, 1, 2000);
    });
  }
}
