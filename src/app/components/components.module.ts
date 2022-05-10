import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpriteComponent } from './sprite/sprite.component';
import { BannerComponent } from './banner/banner.component';
import { ZenComponent } from './zen/zen.component';
import { FooterComponent } from './footer/footer.component';
import { AboutBodyComponent } from './about-body/about-body.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';
import { ToastWaitingComponent } from './toast-waiting/toast-waiting.component';
import { ContactComponent } from './contact/contact.component';
import { PauseComponent } from './pause/pause.component';
import { AssetLoaderModule } from '../modules/asset-loader/asset-loader.module';
import { SoundService } from '../services/sound.service';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [SpriteComponent, ZenComponent, FooterComponent, ToastWaitingComponent,BannerComponent,AboutBodyComponent,HeaderComponent, ButtonComponent, ContactComponent,PauseComponent],
  imports: [
    CommonModule,
    RouterModule,
    AssetLoaderModule,
    PipesModule
  ],
  exports: [
    SpriteComponent,
    BannerComponent,
    AboutBodyComponent,
    ZenComponent,
    FooterComponent,
    HeaderComponent,
    ButtonComponent,
    ToastWaitingComponent,
    ContactComponent,
    PauseComponent,
  ],
  providers:[SoundService]
})
export class ComponentsModule { }
