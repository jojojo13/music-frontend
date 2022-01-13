import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-follow-btn',
  templateUrl: './follow-btn.component.html',
  styleUrls: ['./follow-btn.component.css'],
})
export class FollowBtnComponent implements OnInit,OnChanges {
  @ViewChild('loader') loader!: LoaderComponent;
  @Input() isFollowed: boolean = false;
  @Input() showIcon=true;
  constructor(
   
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
  
  }

 
  
}
