import { Directive, Input, ElementRef } from '@angular/core';
import { AssetLoaderService } from './asset-loader.service';

@Directive({
  selector: '[assetloader]'
})
export class AssetLoaderDirective {

  @Input('assetloader') label: string;
  constructor(private el: ElementRef, private cache: AssetLoaderService) { }

  ngOnInit() {
    this.loadAsset();
  }
  private loadAsset() {
    if (this.label) {
      let src = '';
      if (this.el.nativeElement.localName == 'img' || this.el.nativeElement.localName == 'div') {
        src = this.cache.getImage(this.label);
      }
      if (this.el.nativeElement.localName == 'audio') {
        src = this.cache.getAudio(this.label);
      }
      if (this.el.nativeElement.localName == 'div') {
        this.el.nativeElement.style.backgroundImage = `url(${src})`;
      }else{
        this.el.nativeElement.src = src;
      }

    }
  }

}
