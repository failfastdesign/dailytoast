import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { DeactivateGuard } from './pages/index-page/deactivate-guard';
// import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: IndexPageComponent, canDeactivate: [DeactivateGuard]},
  { path: 'about', component: AboutPageComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
