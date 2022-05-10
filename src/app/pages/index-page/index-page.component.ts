import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AssetLoaderService } from 'src/app/modules/asset-loader/asset-loader.service';
import {pagePushDown, pagePullDown, fadeIn} from '../../animations/animations';
import { DeviceInfoService } from '../../services/device-info.service';
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
  animations: [pagePushDown, pagePullDown, fadeIn],
})
export class IndexPageComponent implements OnInit {
  // @Input() progress: number = 0;
  time: string = null;
  buttonUp: any;
  buttonDown: any;
  buttonBig: any;
  progress = 0;
  unit: string;
  isMobile = false;
  isIE = false;
  constructor(private assetLoader: AssetLoaderService, public deviceInfo: DeviceInfoService ) { }
  ngOnInit(): void {
    this.assetLoader.getProgress().subscribe(progress => {
      this.progress = progress;
    });
    this.isMobile = this.deviceInfo.getDeviceIfo().mobile;
    this.isIE = this.deviceInfo.getDeviceIfo().isIE();
    if (this.isMobile){
      document.querySelector('body').classList.add('mobile-device')
    } else{
      document.querySelector('body').classList.remove('mobile-device')
    }
    if (this.isIE){
      document.querySelector('body').classList.add('browser-ie')
    } else{
      document.querySelector('body').classList.remove('browser-ie')
    }
  }
  onResize(event) {
    this.isMobile = this.deviceInfo.getDeviceIfo().mobile;
    this.isIE = this.deviceInfo.getDeviceIfo().isIE;
  }
  startTimer(data){
    this.time = data.time;
    this.unit = data.unit;
  }
  animationStarted(event){
    document.querySelector('body').classList.add('hideOverflow');
    setTimeout(() => {
      document.querySelector('body').classList.remove('hideOverflow');
    }, 400);
  }

  quitGame(){
    this.time = null;
  }

  canDeactivate() {
    if (this.time){
      return confirm('Leave site? Changes you made may not be saved.');
    }
    return true;
  }
}
