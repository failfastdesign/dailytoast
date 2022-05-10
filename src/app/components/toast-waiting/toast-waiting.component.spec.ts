import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastWaitingComponent } from './toast-waiting.component';

describe('ToastWaitingComponent', () => {
  let component: ToastWaitingComponent;
  let fixture: ComponentFixture<ToastWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
