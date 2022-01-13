import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingerFollowComponent } from './singer-follow.component';

describe('SingerFollowComponent', () => {
  let component: SingerFollowComponent;
  let fixture: ComponentFixture<SingerFollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingerFollowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingerFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
