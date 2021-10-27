import { Component, Input, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/app/service/authorize.service';
import { SongsServiceService } from 'src/app/service/songs-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../../music-for-you/music-for-you.component';

@Component({
  selector: 'app-change-current-song',
  templateUrl: './change-current-song.component.html',
  styleUrls: ['./change-current-song.component.css']
})
export class ChangeCurrentSongComponent implements OnInit {
  @Input('data') song:Song = {
    _id: '',
    name: '',
    singer: '',
    genres: [],
    img: '',
    views: 0,
    likes: 0,
    dislikes: 0,
    link: '',
    isLiked:true
  };
  
  constructor(private songService:SongsServiceService,private auth:AuthorizeService,private userService:UserServiceService) { }

  ngOnInit(): void {
  }
  changeCurrentSong() {
    const musicList= document.querySelector('.musicList') as HTMLElement;
    //run animation onClick
    musicList.style.animationPlayState ="running"

    // paused animation after 4secs
    setTimeout(() => {
      musicList.style.animationPlayState ="paused"
    }, 4000);
    
    // pass Song selected to bottom bar to play
    this.songService.bindSongDataToPlay(this.song)
    // this.songService.updateHistory(this.song._id)
    
    this.songService.getAllsong().subscribe(songs=>{
            // send current songID to server
            this.userService.pushSongToUserHistory(this.song._id).subscribe(
              //server response songID listened array
              ids=>{   
              //historySongArr by filter songID listened in songs
              this.userService.historySongArr=this.songService.getListSongbyIDs(ids,songs)
              //update history song when listen new song
              this.userService.historySong.next(this.songService.getListSongbyIDs(ids,songs))
          
            })
  })
  }
}
