import { style } from '@angular/animations';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { popupState, fadeIn } from 'src/app/animations/animations';
import html2canvas from 'html2canvas';
import { SoundService } from '../../services/sound.service';
import * as moment from 'moment';
import { DeviceInfoService } from 'src/app/services/device-info.service';

@Component({
  selector: 'app-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss'],
  animations: [
    popupState,
    fadeIn
  ]
})
export class PauseComponent implements OnInit, OnChanges {
  @Input() show: boolean = false;
  @Input() participants = [];
  @Input() participant;
  @Input() maxtime = '';
  @Input() elapsedtime = '';
  @Output() onResume = new EventEmitter();
  @Output() onQuit = new EventEmitter();
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  message = ""; //THANOS SHOULD WIPE OUT<br>HALF OF THIS TEAM!
  averageTime = "00:00";
  totalMaxtime = '';
  banner: string = 'pause_good';
  color:string = '#23D7C5';
  objectValues = Object.values;
scores = {
  row:{
    count:0,
    bread:'toast_raw',
    label:'RAW'
  },
  nailed:{
    count:0,
    bread:'toast_eggs',
    label:'NAILED'
  },
  burned:{
    count:0,
    bread:'toast_burnned',
    label:'BURNT'
  },
}
  public toggle : boolean = false;
  isSound: boolean = true;
  buttonUp:any;
  constructor(private soundService:SoundService, private deviceinfo:DeviceInfoService) { }

  ngOnInit(): void {
    this.soundService.getIsSound().subscribe((isSound)=>{this.isSound=isSound});
  }
  soundSwitch(event){
    this.soundService.toggleSound();
  }
  ngOnChanges() {
    if (this.show) {
      // finding time diffrence bettwen maxtime and elapased time
      document.querySelector('body').classList.add('popupOpen')
      this.calculateTimeDiff();
    } else{
      document.querySelector('body').classList.remove('popupOpen');
    }
  }


  calculateTimeDiff() {
    let timesplit = this.maxtime.split(':');
    if (timesplit.length != 3){return;}
    let hour = timesplit[0];
    let minutes = timesplit[1];
    let seconds = timesplit[2];
    let clock = moment().startOf("day")
    clock.add(seconds, 'seconds').add(minutes, 'minutes').add(hour, 'hours');
    for (let i = 0; i < this.participants.length; i++) {
      clock.add(seconds, 'seconds').add(minutes, 'minutes').add(hour, 'hours');
    }
    this.totalMaxtime = clock.format('HH:mm:ss');

    this.findAverageTime();
    this.findScores();
    // calculate percentage
    let pct = 100 * this.totalSeconds(this.elapsedtime) / this.totalSeconds(this.totalMaxtime);
    if (pct > 0 && pct <= 40) {
      this.banner = 'pause_fine';
      this.message = "<div>THAT'S SO-SO ... C'MON! </div><div>A LITTLE CHOCOLATE DOESN'T HURT!</<div>";
      this.color = '#FFB526';
    } else if (pct > 40 && pct <= 90) {
      this.banner = 'pause_good'
      this.message = "<div>THAT'S SCRUMMY! CLEAR MINDS, </div><div>FULL TUMMIES, CAN'T LOSE</div>";
      this.color = '#23D7C5';
    } else if (pct > 90 && pct <= 110) {
      this.banner = 'pause_dope'
      this.message = "<div>IF WE ARE WHAT WE EAT, </div><div>THEN THIS TEAM IS MAGNIFICENT!</div>";
      this.color = '#23D7C5'
    } else if (pct > 110 && pct <= 130) {
      this.banner = 'pause_bad';
      this.message = "<div>THIS TEAM NEEDS MORE </div><div>COFFEE TO GET THROUGH THE DAY!</div>";
      this.color = '#FF6A74';
    } else if (pct > 130) {
      this.banner = 'pause_scary';
      this.message = "<div>SOMEBODY CALL 911 </div><div>THE PROJECT BUDGET IS BURNING!</div>";
      this.color = '#FF6A74';
    } else {
      this.banner = 'pause_fine'
      this.message = "<div>THAT'S SO-SO ... C'MON! </div><div>A LITTLE CHOCOLATE DOESN'T HURT!</div>";
      this.color = '#FFB526';
    }
  }

  findAverageTime() {
    // avaerage time
    // elapsedtime / number of participents
    let average = this.totalSeconds(this.elapsedtime) / (this.participants.length + 1);
    this.averageTime = moment().startOf('day').seconds(average)
      .format('HH:mm:ss');

  }

  findScores(){
    // reseting all counters
    this.scores.burned.count = 0;
    this.scores.row.count = 0;
    this.scores.nailed.count = 0;
    // counting
    this.participants.forEach(elem => {
      this.calculateToastScore(elem);
    });
    this.calculateToastScore(this.participant);
  }

  calculateToastScore(elem){
    if (elem.bread === 'toast_raw'){
      this.scores.row.count++;
    }else if (elem.bread == 'toast_superburned' || elem.bread == 'toast_burnned'){
      this.scores.burned.count++;
    }else{
      this.scores.nailed.count++;
    }
  }

  resume() {
    this.onResume.emit(true);
  }

  quit() {
    this.onQuit.emit(true);
  }

  download() {
    this.toggle = true;
    setTimeout(() => {
      html2canvas(this.screen.nativeElement,{
        width:600,
        height:600,
        scale: 1,
        onclone:(e)=>{
          e.getElementById('download').style.display='block';
          let elm = <HTMLElement><any>e.querySelector('.screenshare_hidden');
          elm.style.fontFamily='"urbane-rounded", sans-serif';
          elm.style.textAlign='center';
        }
      }).then(canvas => {
        this.canvas.nativeElement.src = canvas.toDataURL();
        this.downloadLink.nativeElement.href = canvas.toDataURL('image/jpg');
        this.downloadLink.nativeElement.download = 'daily-toast.jpg';
        this.downloadLink.nativeElement.click();
      });
    });
  }

  shareTwitter() {
    let params = `scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,
width=500,height=500`;
    window.open("http://twitter.com/share?text=The scrummiest timer for stand-up meetings by Fail Fast. Don't let your team burn! ⏳&url="+ window.location.href.split('#')[0]+"&hashtags=Lean,Agile,Daily,StandUp,Scrum,UX", 'Twitter', params);
  }
  shareLinkedIn() {
    //<a href="https://twitter.com/share?hashtags=awesome,sharing&text=My Page Title or Something Else to share&via=MyTwitterHandle"><img src="/my_custom_twitter_image.png" title="Share this page on Twitter" /></a>
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + window.location.href.split('#')[0] + '&summary=The scrummiest timer for stand-up meetings. Do not let your team burn!&source=LinkedIn',  'Linkedin', '_blank, width=500, height=500, resizable=yes, scrollbars=yes');
  }

  totalSeconds(time) {
    var parts = time.split(':');
    return (Number(parts[0]) * 3600) + (Number(parts[1]) * 60) + Number(parts[2]);
  }

  // applyZoom(){
  //   let element = <HTMLElement><any>document.querySelector('.pause-wrapper');
  //   let pauseHeight = this.getHeight(element);
  //   console.log(document.querySelector('body').offsetHeight)
  //   if(window.innerHeight<pauseHeight&&window.innerWidth>768){
  //     document.querySelector('body').classList.add('zoomOut');
  //   } else {
  //     document.querySelector('body').classList.remove('zoomOut');
  //   }
  // }
  // getHeight(element) {
  //   let height = element.offsetHeight;
  //   let style = getComputedStyle(element);
  //   height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  //   return height;
  // }

}
