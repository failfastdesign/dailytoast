import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetLoaderDirective } from './asset-loader.directive';
import { AssetLoaderService } from './asset-loader.service';



@NgModule({
  declarations: [AssetLoaderDirective],
  imports: [
    CommonModule
  ],
  providers:[AssetLoaderService],
  exports:[
    AssetLoaderDirective
  ]
})
export class AssetLoaderModule { }
