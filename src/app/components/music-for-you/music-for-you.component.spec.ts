import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicForYouComponent } from './music-for-you.component';

describe('MusicForYouComponent', () => {
  let component: MusicForYouComponent;
  let fixture: ComponentFixture<MusicForYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicForYouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
