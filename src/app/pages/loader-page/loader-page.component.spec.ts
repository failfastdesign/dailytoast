import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderPageComponent } from './loader-page.component';

describe('LoaderPageComponent', () => {
  let component: LoaderPageComponent;
  let fixture: ComponentFixture<LoaderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
