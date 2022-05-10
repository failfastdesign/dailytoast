import { Component, OnInit } from '@angular/core';
import { AssetLoaderService } from './modules/asset-loader/asset-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'daily-toast';
  progress = 0;

  constructor(private assetLoader: AssetLoaderService){

  }
  ngOnInit(){

  }
}
