import { Component, OnInit } from '@angular/core';
import { GetdataService } from './service/getdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
 

  constructor(private service:GetdataService){

  }
   ngOnInit(){
    

  }

}
