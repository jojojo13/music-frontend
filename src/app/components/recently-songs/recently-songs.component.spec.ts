import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlySongsComponent } from './recently-songs.component';

describe('RecentlySongsComponent', () => {
  let component: RecentlySongsComponent;
  let fixture: ComponentFixture<RecentlySongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlySongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlySongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
