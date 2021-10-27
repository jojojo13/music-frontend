import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-mymusic',
  templateUrl: './mymusic.component.html',
  styleUrls: ['./mymusic.component.css']
})
export class MymusicComponent implements OnInit,OnDestroy {

  myFavoriteSongs!:Song[]
  constructor(private userService:UserServiceService) { 
  
  }

  ngOnInit() {
    this.userService.userFavoriteSongChange.subscribe((songs:Song[]) =>{
        songs.forEach(song=>{
          song['isLiked']=true
        })
       
        this.myFavoriteSongs=songs
      
    
    })
  }
  ngOnDestroy():void{
    console.log('destroy')
  }
  
}
