import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, NgZone, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AssetLoaderService } from 'src/app/modules/asset-loader/asset-loader.service';
import { SoundService } from '../../services/sound.service';

interface Altas {
  image: string,
  json: string
}

@Component({
  selector: 'app-toast-waiting',
  templateUrl: './toast-waiting.component.html',
  styleUrls: ['./toast-waiting.component.scss']
})
export class ToastWaitingComponent implements OnInit, OnDestroy {
  @Input() fps = 15;
  @Output() completed: EventEmitter<any> = new EventEmitter();
  @Output() onreset: EventEmitter<any> = new EventEmitter();
  @Output() onready: EventEmitter<any> = new EventEmitter();
  @ViewChild('sprite', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  altas: Altas = null;
  requestId;
  timeoutId;
  frameIndex = 0;
  image: any;
  frames = [];
  sprite_labels = ['ready', 'wait1', 'wait2', 'wait3', 'shoot'];
  sprites = {};
  audios = {};
  index = 0;
  ready = true;
  shoot = false;
  audioReset = null;
  audioNext = null;
  audioReady = null;
  spriteRatio = 0;
  isSound = true;
  constructor(private assetLoader: AssetLoaderService, private renderer: Renderer2, private ngZone: NgZone, private soundService:SoundService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadsprites();
    this.audioReset = new Audio();
    this.audioReset.src = this.assetLoader.getAudio('button_next');
    this.audioReset.load();
    this.audioNext = new Audio();
    this.audioNext.src = this.assetLoader.getAudio('effect_state_change');
    this.audioNext.load();
    this.audioReady = new Audio();
    this.audioReady.src = this.assetLoader.getAudio('effect_ready');
    this.audioReady.load();

    this.audioReset.volume = 0.9;
    this.audioNext.volume = 0.9;
    this.audioReady.volume = 0.9;
    this.soundService.getIsSound().subscribe((isSound) => {
      this.isSound = isSound;
      if (this.isSound){
        this.audioReset.muted = false;
        this.audioNext.muted = false;
        this.audioReady.muted = false;
      } else{
        this.audioReset.muted = true;
        this.audioNext.muted = true;
        this.audioReady.muted = true;
      }
    });
  }


  loadsprites(index = 0) {
    let label = this.sprite_labels[index];
    let altas = this.assetLoader.getAltas(label);
    let image = new Image();
    let frames = altas.json['textures'][0]['frames'];
    image.src = altas.image;
    image.addEventListener('load', e => {
      this.sprites[label] = {
        image: image,
        frames: frames
      }
      if (index < this.sprite_labels.length - 1) {
        index++;
        this.loadsprites(index);
      } else {
        this.initAnimation();
      }
      this.spriteRatio = 300/560
    });
  }


  initAnimation() {
    let readyAnim = this.sprites['ready'];
    this.canvas.nativeElement.width = readyAnim.frames[0].frame.w;
    this.canvas.nativeElement.height = readyAnim.frames[0].frame.h;

    this.ctx = this.canvas.nativeElement.getContext('2d');
    let soundtimeout = setTimeout(()=>{
      this.audioReady.play();
      clearTimeout(soundtimeout);
    });
    // initializing canvas loop
    this.init();
  }

  init() {
    this.image = this.sprites['ready']['image'];
    this.frames = this.sprites['ready']['frames'];
    this.update()
  }

  update() {
    let frame = this.frames[this.frameIndex];
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.drawImage(
      this.image, // image
      frame.frame.x, // sx
      frame.frame.y, // sy
      frame.spriteSourceSize.w, // sWidth
      frame.spriteSourceSize.h, // sHeight
      0, // dy
      0, // dy
      frame.frame.w, // dWidth
      frame.frame.h // dHeight
    );
    this.frameIndex++;
    if (this.shoot && this.frameIndex === this.frames.length - 4) {
          this.onreset.emit('reset');
    }
    if (this.ready && this.frameIndex === this.frames.length) {
      this.onready.emit('ready');
}
    if (this.frameIndex === this.frames.length) {
      if (this.ready) {
        this.ready = false;
        // this.onready.emit('ready');
        this.nextAnim();
      } else if (this.shoot){
        this.shoot = false;
        this.nextAnim();
      }else {
        this.frameIndex = 0;
      }
    }
    this.timeoutId = setTimeout(() => {
      this.requestId = window.requestAnimationFrame(this.update.bind(this));
    }, 1000 / this.fps);
    // this.canvas.nativeElement.width = this.ctx.canvas.height/this.spriteRatio
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.requestId);
    clearTimeout(this.timeoutId);
    this.sprites = {};
  }


  nextAnim(reset: boolean = false) {
    if (reset) {
      this.image = this.sprites['shoot']['image'];
      this.frames = this.sprites['shoot']['frames'];
      this.shoot = true;
      this.index = 0;
    } else {
      this.index++;
      this.image = this.sprites['wait' + this.index]['image'];
      this.frames = this.sprites['wait' + this.index]['frames'];
    }
    this.frameIndex = 0;
  }

  next() {
    if (!this.ready && this.index < 3) {
      this.playSound(this.audioNext);
      this.nextAnim();
    }
  }

  reset() {
    this.playSound(this.audioReset);
    this.nextAnim(true);
  }

  playSound(audio) {
    audio.pause()
    audio.currentTime = 0
    audio.play();
  }

}
