import { Component, OnInit } from '@angular/core';
import { SongsServiceService } from 'src/app/service/songs-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.css']
})
export class RightbarComponent implements OnInit {
  historySong!:Song[]
  indexSongPlaying=-1
  constructor(private songService:SongsServiceService,private userService:UserServiceService) { }
  
  ngOnInit(): void {
    const userToken=localStorage.getItem('token')
      if(userToken!=null){
        //update history after 1sec
    setTimeout(() => {
     
      this.userService.historySong.subscribe(historySong=>{ 
        this.historySong=historySong

        //get current song play
        this.songService.currentSongChange.subscribe(currentSongPlay=>{  
          if(currentSongPlay){
            //add animation in history song by index
            let index=this.historySong.findIndex(song=>song._id==currentSongPlay._id)
            this.indexSongPlaying=index
          }
      })
      })
    }, 1000);
  }
}

}
