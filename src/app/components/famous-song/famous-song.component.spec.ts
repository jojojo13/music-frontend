import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamousSongComponent } from './famous-song.component';

describe('FamousSongComponent', () => {
  let component: FamousSongComponent;
  let fixture: ComponentFixture<FamousSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamousSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamousSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
