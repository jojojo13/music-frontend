import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MymusicComponent } from './mymusic.component';

describe('MymusicComponent', () => {
  let component: MymusicComponent;
  let fixture: ComponentFixture<MymusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MymusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MymusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
