import { Component, OnInit } from '@angular/core';
import { SoundService } from '../../services/sound.service';
import { Router } from '@angular/router';
// import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[],
})
export class HeaderComponent implements OnInit {
  router: string;
  isSound: boolean = true;
  buttonUp:any;
  // private soundToggleRef: Subscription = null;
  constructor(private _router: Router, private soundService:SoundService)
  {
    this.router = _router.url;
  }

  ngOnInit(): void {
    this.soundService.getIsSound().subscribe((isSound)=>{this.isSound=isSound});

  }
  soundSwitch(event){
    this.soundService.toggleSound();
  }
  routerLink(event){
    let link:string = event.currentTarget.getAttribute("data-link")
    this._router.navigate([link]);
  }
}
