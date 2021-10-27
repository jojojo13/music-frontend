import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavSongComponent } from './add-fav-song.component';

describe('AddFavSongComponent', () => {
  let component: AddFavSongComponent;
  let fixture: ComponentFixture<AddFavSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFavSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFavSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
