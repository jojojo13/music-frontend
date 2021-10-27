import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCurrentSongComponent } from './change-current-song.component';

describe('ChangeCurrentSongComponent', () => {
  let component: ChangeCurrentSongComponent;
  let fixture: ComponentFixture<ChangeCurrentSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCurrentSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCurrentSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
