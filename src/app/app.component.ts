import { UserServiceService } from 'src/app/service/user-service.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { SongsServiceService } from './service/songs-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserServiceService,
    private songService: SongsServiceService
  ) {}
//   myValue = "Hello world!"
//   @HostListener('window:beforeunload', (['$event']))
//   unLoadHandler($event:Event) {
//     $event.returnValue=true
//     console.log('Processing to post current song to server',this.myValue)
//     this.postCurrentSongToServer()
  
//  }
//  postCurrentSongToServer(){
//   return confirm('your changes need to be saved');

 

  ngOnInit() {
   
  }
}
