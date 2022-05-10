import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerPageComponent } from './timer-page/timer-page.component';
import { LoaderPageComponent } from './loader-page/loader-page.component';
// import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { AssetLoaderService } from '../modules/asset-loader/asset-loader.service';
import { AssetLoaderModule } from '../modules/asset-loader/asset-loader.module';
import { ComponentsModule } from '../components/components.module';
import { AppRoutingModule } from '../app-routing.module';
import { IndexPageComponent } from './index-page/index-page.component';
import { SoundService } from '../services/sound.service';
import { PipesModule } from '../pipes/pipes.module';
import { DeactivateGuard } from './index-page/deactivate-guard';
@NgModule({
  declarations: [
    IndexPageComponent,
    LoaderPageComponent,
    TimerPageComponent,
    AboutPageComponent,
  ],
  imports: [
    CommonModule,
    AssetLoaderModule,
    ComponentsModule,
    AppRoutingModule,
    PipesModule
  ],
  exports: [
    IndexPageComponent,
    LoaderPageComponent,
    TimerPageComponent,
    AboutPageComponent,
  ],
  providers: [
    SoundService,
    DeactivateGuard
  ]
})
export class PagesModule { }
