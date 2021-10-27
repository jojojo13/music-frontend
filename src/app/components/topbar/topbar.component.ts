import { Component, ElementRef, OnInit } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { PopUpChangeBgColorComponent } from '../pop-up-change-bg-color/pop-up-change-bg-color.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  constructor(private elementRef: ElementRef, private dialogRef: MatDialog) {}

  ngOnInit(): void {
    
  }

  changeColor() {
    const data = this.dialogRef.open(PopUpChangeBgColorComponent, {
      width: '750px',
    });
    const dialog = this.elementRef.nativeElement.ownerDocument.querySelector(
      '.mat-dialog-container'
    );
    const topbar =
      this.elementRef.nativeElement.ownerDocument.querySelector('.topbar');
    const bottombar =
      this.elementRef.nativeElement.ownerDocument.querySelector('.bottombar');
    const body = this.elementRef.nativeElement.ownerDocument.body;
    const rightbar=this.elementRef.nativeElement.ownerDocument.querySelector('.rightbar');
   
    data.afterClosed().subscribe((result) => {
      if(result){
        body.style.backgroundColor = result.value1;
        // dialog.style.setProperty('background', result.value1, 'important');
        topbar.style.backgroundColor = result.value1;
        bottombar.style.backgroundColor = result.value2;
        rightbar.style.backgroundColor = result.value3;
        dialog.style.backgroundColor=result.value1
      }
    
     
    });
  }
}
