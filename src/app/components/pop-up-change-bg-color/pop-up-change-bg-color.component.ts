import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export interface color {
  name: string;
  value: string;
}
@Component({
  selector: 'app-pop-up-change-bg-color',
  templateUrl: './pop-up-change-bg-color.component.html',
  styleUrls: ['./pop-up-change-bg-color.component.css'],
})
export class PopUpChangeBgColorComponent implements OnInit {
  darkColorsValue = [
    ,
    '#220945',
    '#141C2A',
    '#1B3D53',
    '#17332B',
    '#453C3A',
    '#4A0037',
    '#4B1E20',
  ];
  darkColor = [
    {
      name: 'Dark',
      value1: 'rgb(30, 30, 30)',
      value2: 'rgb(24, 24, 24)',
      value3: 'rgb(45, 47, 50)',
    },
    {
      name: 'Purple',
      value1: 'rgb(18, 12, 28)',
      value2: 'rgb(23, 15, 35)',
      value3: 'rgb(18, 8, 34)',
    },
    {
      name: 'Blueto',
      value1: 'rgb(29, 55, 90)',
      value2: 'rgb(23, 44, 72)',
      value3: 'rgb(11, 39, 76)',
    },
    
    {
      name: 'Green',
      value1: 'rgb(18, 69, 52)',
      value2: 'rgb(14, 55, 42)',
      value3: 'rgba(12, 82, 58)',
    },
    {
      name: 'Brown',
      value1: 'rgb(87, 64, 59)',
      value2: 'rgb(70, 51, 47)',
      value3: 'rgb(99, 66, 60)',
    },

  ];
  colorChoosed: any;
  constructor(public dialogRef: MatDialogRef<PopUpChangeBgColorComponent>) {}

  ngOnInit(): void {}
  choose(color: any) {  
    this.dialogRef.close(color);
  }
}
