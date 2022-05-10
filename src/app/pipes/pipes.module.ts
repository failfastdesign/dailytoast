import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourhidePipe } from './hourhide/hourhide.pipe';



@NgModule({
  declarations: [HourhidePipe],
  imports: [
    CommonModule
  ],
  exports: [HourhidePipe],
})
export class PipesModule { }
