import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, NgZone, Output, EventEmitter } from '@angular/core';
import { AssetLoaderService } from 'src/app/modules/asset-loader/asset-loader.service';
interface Altas {
  image: string,
  json: string
}
@Component({
  selector: 'app-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.scss']
})
export class SpriteComponent implements OnInit {
  @Input() label: string;
  @Input() animate: boolean = false;
  @Input() start: number = 0;
  @Input() end: number;
  @Input() loop: boolean = true;
  @Input() fps:number = 30;
  @Output() completed:EventEmitter<any> = new EventEmitter();
  @ViewChild('sprite', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  altas: Altas = null;
  requestId;
  frameIndex = 0;
  image: any;
  frames = [];
  constructor(private assetLoader: AssetLoaderService, private renderer: Renderer2, private ngZone: NgZone) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.label) {
      this.altas = this.assetLoader.getAltas(this.label);
      this.create();
    }
  }

  create(callback?) {
    if (this.altas) {
      this.frames = this.altas.json['textures'][0]['frames'];
      this.image = new Image();
      this.image.src = this.altas.image;

      let firstFrame = this.frames[0];
      this.canvas.nativeElement.width = firstFrame.frame.w;
      this.canvas.nativeElement.height = firstFrame.frame.h;
      this.ctx = this.canvas.nativeElement.getContext('2d');

      if (this.frames.length > 0) {
        this.image.addEventListener('load', e => {
          this.init();
          if(callback) {
            callback();
          }
        });
      }
    }
  }

  init() {
    this.ngZone.runOutsideAngular(() => this.update());
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
     if(this.frameIndex >= this.frames.length){
     if(this.loop == true){
      this.frameIndex = 0;
     }else{
      this.completed.emit('completed');
       return;
     }
     }
     setTimeout(()=> {
     this.requestId = window.requestAnimationFrame(this.update.bind(this));
    }, 1000 / this.fps);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.requestId);
  }


  updateSprite(label,callback?){
    this.label = label;
    cancelAnimationFrame(this.requestId);
    this.altas = this.assetLoader.getAltas(this.label);
    this.create(callback);
  }

}
