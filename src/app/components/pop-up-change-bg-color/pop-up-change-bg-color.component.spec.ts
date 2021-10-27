import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpChangeBgColorComponent } from './pop-up-change-bg-color.component';

describe('PopUpChangeBgColorComponent', () => {
  let component: PopUpChangeBgColorComponent;
  let fixture: ComponentFixture<PopUpChangeBgColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpChangeBgColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpChangeBgColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
