import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

export enum AssetType { 'image', 'json', 'audio', 'sprite' };
interface FileRequest {
  label: string,
  url: string,
  type: AssetType
}
interface Image extends FileRequest {
  data?: any
}
interface Json extends FileRequest {
  data?: any
}
interface Audio extends FileRequest {
  data?: any
}
interface Sprite extends FileRequest {
  data?: any,
  jsonData: string
}

@Injectable({
  providedIn: 'root'
})
export class AssetLoaderService {
  loadFiles() {
    throw new Error("Method not implemented.");
  }
  private images: Object = {};
  private json: Object = {};
  private audio: Object = {};
  lastLoaded: Subject<any> = new Subject();
  requests: FileRequest[] = [];
  progress: BehaviorSubject<number> = new BehaviorSubject(0);
  private totalrequests: number = 0;
  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) {

  }
  /**
   * Add asset files to loader queue
   */
  loadImage(label: string, url: string) {
    this.addToQueue(label, url, AssetType.image);
  }
  loadJson(label: string, url: string) {
    this.addToQueue(label, url, AssetType.json);
  }
  loadAudio(label: string, url: string) {
    this.addToQueue(label, url, AssetType.audio);
  }
  loadAltas(label: string, imageUrl: string, jsonUrl:string) {
    this.addToQueue(label, imageUrl, AssetType.image);
    this.addToQueue(label, jsonUrl, AssetType.json);
  }

  private addToQueue(label: string, url: string, type: AssetType): void {
    this.requests.push({
      label: label,
      url: url,
      type: type
    });
  }
  /**
  * starts fetching the queue items one by one and save in array object
  */
  startFetching(): Subject<number> {
    if(this.progress.getValue() != 100){
      this.totalrequests = this.requests.length;
      this.load()
    }
    return this.progress;
  }
  getProgress(){
    return this.progress;
  }
  /**
  * loades files one by one recursively
  */
  private load() {
    this.progress.next(((this.totalrequests - this.requests.length) / this.totalrequests) * 100);
    if (this.requests.length > 0) {
      let request = this.requests.shift();
      if (request.type == AssetType.image) {
        this.http.get(request.url, { responseType: 'blob' }).subscribe(res => {
          this.getFileBase64(res, (base64) => {
            let image = {
              label: request.label,
              url: request.url,
              type: request.type,
              data: base64
            };
            this.images[request.label] = image;
            this.lastLoaded.next(image);
            this.load();
          });
        })
      } else if (request.type == AssetType.json) {
        this.http.get(request.url, { responseType: 'json' }).subscribe(res => {
          let json = {
            label: request.label,
            url: request.url,
            type: request.type,
            data: res
          };
          this.json[request.label] = json;
          this.lastLoaded.next(json);
          this.load();
        })
      } else {
        this.http.get(request.url, { responseType: 'blob' }).subscribe(res => {

          this.getFileBase64(res, (base64) => {
            let audio = {
              label: request.label,
              url: request.url,
              type: request.type,
              // data: this._sanitizer.bypassSecurityTrustUrl(base64)
              data: base64
            };
            this.audio[request.label] = audio;
            this.lastLoaded.next(audio);
            this.load();
          });
        })
      }

    } else {

    }
  }
  /**
  * convert file top base64
  * @callback been called after converison ends
  */
  getFileBase64(data: Blob, callback) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      // let result = this._sanitizer.bypassSecurityTrustHtml()
      callback(reader.result);

    }, false);
    if (data) {
      reader.readAsDataURL(data);
    }
  }
  /**
  * Returns recently fetched items..
  */
  getLoadedQueueFiles(): Subject<any> {
    return this.lastLoaded;
  }
  /**
  * Returns Image
  * @label label of image file
  */
  getImage(label: string) {
    return this.returnAssetData(this.images[label]);
  }
  /**
 * Returns Image
 * @label label of audio file
 */
  getAudio(label: string) {
    return this.returnAssetData(this.audio[label]);
  }
  /**
  * Returns Image
  * @label label of json file
  */
  getJson(label: string) {
    return this.returnAssetData(this.json[label]);
  }

  getAltas(label){
    return {
      image: this.returnAssetData(this.images[label]),
      json:this.returnAssetData(this.json[label])
    }
  }

  private returnAssetData(file: Image | Audio | Json) {
    return file ? file.data : '';
  }


}
