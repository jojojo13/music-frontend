import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-mymusic',
  templateUrl: './mymusic.component.html',
  styleUrls: ['./mymusic.component.css']
})
export class MymusicComponent implements OnInit {
  title='Bài hát yêu thích'
  myFavoriteSongs!:Song[]
  isLoaded=false
  constructor(private userService:UserServiceService) { 
  
  }

  ngOnInit() {
   this.userService.favoriteSong.subscribe(favSong=>{
     this.myFavoriteSongs=favSong
      this.isLoaded=true
   })
  }
 
  
}
