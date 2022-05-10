import { CanDeactivate } from '@angular/router';
import { IndexPageComponent } from './index-page.component';

export class DeactivateGuard implements CanDeactivate<IndexPageComponent> {

  canDeactivate(component: IndexPageComponent) {
    return component.canDeactivate();
  }
}
