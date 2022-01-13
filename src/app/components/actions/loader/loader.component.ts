
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input('isLoaded') isLoaded=true
  @Input('width') width=35
  @Input('height') height=35
  @Input('top') top=20
  @Input('left') left=50
  @Input('textDisplay') textDisplay=true
  @Input('flexDirection') flexDirection='column'
  
  constructor() { 
   
  }
  

  ngOnInit(): void {
  
  }

}
