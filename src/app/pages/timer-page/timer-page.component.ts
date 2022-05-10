import { Component, OnInit, OnDestroy, Output, ViewChild, EventEmitter, Input, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ToastWaitingComponent } from 'src/app/components/toast-waiting/toast-waiting.component';
import {
  fadeIn, fadeInUp, fadeOut, counterState, swipeState,
  scaleUp, timerState, scaleIn, bannerState, pMessageState
} from '../../animations/animations';
import { SoundService } from '../../services/sound.service';
import { Howl, Howler } from 'howler';
import * as moment from 'moment';
interface Partcipents {
  id: number;
  counter: string;
  percentage: number;
  bread?: string;
  active?: boolean;
  min: string;
  sec: string;
  hour: string;
}
@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.scss'],
  animations: [
    fadeIn,
    fadeInUp,
    fadeOut,
    counterState,
    swipeState,
    scaleUp,
    scaleIn,
    timerState,
    bannerState,
    pMessageState
  ]
})
export class TimerPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() maxtime = '00:10';
  @Input() unit = 'min';
  canQuit = false;
  backgroundColor = '#23D7C5';
  buttonClick: any;
  bread = 'toast_raw';
  personId = 1;
  personTime = '00:00';
  showmesage = false;
  ready = false;
  clockIntervel;
  private clock;
  private participantClock;
  clockHour = '00';
  clockPause = false;
  public show = false;
  clockCounter = 'READY';
  participantCounter = 'READY';
  nextpressed = false;
  nextParticepantTimeout;
  partcipents: Partcipents[] = [];
  participant: Partcipents;
  isSound = true;
  bgMusic;
  bannerHeight: number;
  prevParticipant: Partcipents;
  bannerMobileLayout = false;
  @Output() pauseGame = new EventEmitter<any>();
  @ViewChild('toastwaiting') toast: ToastWaitingComponent;
  @ViewChild('banner') banner: ElementRef<HTMLDivElement>;
  @Output() onQuitGame = new EventEmitter();
  shownextbutton = false;
  waitstatus = 'green';
  pausePopupShow = false;
  @HostListener('window:beforeunload') onBeforeUnload($event){
    $event.returnValue = 'Are you sure you want to leave? Your breakfast will be wasted.';
  };
  constructor(private soundService: SoundService) { }
  onResize(event) {
    this.bannerHeight = (
      this.isMobLayout() ? window.innerWidth / 2 : this.banner.nativeElement.clientHeight
    );
    this.bannerMobileLayout = this.isMobLayout()
  }
  ngOnInit(): void {
    this.initAudio();
    this.soundService.getIsSound().subscribe((isSound) => {
      this.isSound = isSound,
        (this.isSound) ? this.buttonClick.mute(false) : this.buttonClick.mute(true);
      (this.isSound) ? this.bgMusic.mute(false) : this.bgMusic.mute(true);
    });
    (this.pausePopupShow) ? this.bgMusic.pause() : this.bgMusic.play();
    setTimeout(() => {
      this.showmesage = true;
      this.createParticipant();
    }, 700);
    window.onbeforeunload = (event) => {
      // e.preventDfault();
      return 'Are you sure you want to leave? Your breakfast will be wasted.';
    }
    // window.on('beforeunload',(event) => {
    //   console.log(event);
    //   // event.preventDefault();
    //   return 'Are you sure you want to leave? Your breakfast will be wasted.';
    // });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.bannerHeight = (
        this.isMobLayout() ? window.innerWidth / 2 : this.banner.nativeElement.clientHeight
      );
      this.bannerMobileLayout = this.isMobLayout();
    });

  }
  isMobLayout() {
    return window.innerWidth < window.innerHeight;
  }
  ngOnDestroy() {
    this.bgMusic.stop();
    this.bgMusic.unload();
    clearInterval(this.clockIntervel);
  }
  next() {
    this.toast.next();
  }
  initAudio() {
    this.buttonClick = new Howl({
      src: 'assets/sounds/Button-Big.mp3',
      autoplay: false,
      format: 'mp3',
      loop: false,
      volume: 0.55
    });
    this.bgMusic = new Howl({
      src: 'assets/sounds/Music-Clock.mp3',
      autoplay: true,
      format: 'mp3',
      loop: true,
      volume: 0.2
    });
  }

  onToastReset() {
    this.partcipents.push(this.prevParticipant);
  }

  startClock() {

  }
  onGamePause(event) {
    this.pauseGame.emit(event);
    this.show = !this.show;
  }

  pause() {
    this.pausePopupShow = true;
    this.clockPause = true;
    this.buttonClick.play();
    this.bgMusic.pause();

  }
  nextParticipant() {
    if (this.ready) {
      this.showmesage = false;
      this.resetParticipantClock();
      this.clockPause = true;
      this.toast.reset();
      this.ready = false;
      this.nextParticepantTimeout = setTimeout(() => {
        this.clockPause = false;
        this.ready = true;
        // clearTimeout(this.nextParticepantTimeout);
      }, 2000);
    }
  }

  onToastReady() {
    // this.maxtime = '00:' + this.maxtime;
    this.clock = moment().startOf('day');
    this.participantClock = moment().startOf('day');
    this.ready = true;
    this.shownextbutton = true;
    this.clockCounter = this.clock.format('HH:mm:ss');
    this.participant.counter = this.participantClock.format('HH:mm:ss');
    this.clockIntervel = setInterval(() => {
      if (!this.clockPause && !this.pausePopupShow) {
        this.clock.add(1, 'seconds');
        this.participantClock.add(1, 'seconds');
        this.clockCounter = this.clock.format('HH:mm:ss');
        this.participant.counter = this.participantClock.format('HH:mm:ss');
        this.participant.min = this.participantClock.format('mm');
        this.participant.sec = this.participantClock.format('ss');
        this.participant.hour = this.participantClock.format('HH');
        this.clockHour = this.clock.format('HH');
        this.tick();
        if(this.participant.hour !== '00'){
          this.nextParticipant();
        }
      }
    }, 1000);
  }

  createParticipant() {
    if (this.participant) {
      // assign current particepant to prev.
      this.prevParticipant = Object.assign({}, this.participant);
    }
    this.participant = {
      id: this.participant ? this.participant.id + 1 : 1,
      percentage: 0,
      active: true,
      counter: '00:00:00',
      bread: 'toast_raw',
      min: '00',
      sec: '00',
      hour: '00',
    };
  }
  resetParticipantClock() {
    // push old particepent into array
    this.participant.active = false;
    this.waitstatus = 'green';
    // this.partcipents.unshift(Object.assign({},this.participant));
    // creates new one
    setTimeout(() => {
      this.createParticipant();
    });
    this.participantClock = moment().startOf('day');
  }

  tick() {
    // changes banner color and toast charectore by meassuring elapsed time percentage
    const pct = 100 * this.totalSeconds(this.participant.counter) / this.totalSeconds(this.maxtime);
    // console.clear();
    // * banner background
    if (pct > 75 && pct < 100) {
      if (this.waitstatus === 'green') { this.next(); this.waitstatus = 'yellow'; }
    } else if (pct >= 100) {
      if (this.waitstatus === 'yellow') { this.next(); this.waitstatus = 'red'; }
    }
    // * breads
    if (pct < 15) {
      this.participant.bread = 'toast_raw';
    } else if (pct >= 15 && pct < 75) {
      this.participant.bread = 'toast_regular';
    } else if (pct >= 15 && pct < 80) {
      this.participant.bread = 'toast_jam';
    } else if (pct >= 80 && pct < 85) {
      this.participant.bread = 'toast_honey';
    } else if (pct >= 85 && pct < 90) {
      this.participant.bread = 'toast_tuna';
    } else if (pct >= 90 && pct < 95) {
      this.participant.bread = 'toast_avocado';
    } else if (pct >= 95 && pct < 100) {
      this.participant.bread = 'toast_eggs';
    } else if (pct >= 100 && pct < 150) {
      this.participant.bread = 'toast_burnned';
    } else {
      this.participant.bread = 'toast_superburned';
    }
    this.participant.percentage = pct;
  }
  totalSeconds(time) {
    const parts = time.split(':');
    return (Number(parts[0]) * 3600) + (Number(parts[1]) * 60) + Number(parts[2]);
    // return Number(parts[0]) * 60 + Number(parts[1]);
  }
  resumeTimer() {
    this.pausePopupShow = false;
    this.clockPause = false;
    this.bgMusic.play();
  }


  quitGame() {
    this.onQuitGame.emit(true);
  }
}
