import { Component, OnInit } from '@angular/core';
import { SongsServiceService } from 'src/app/service/songs-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.css'],
})
export class RightbarComponent implements OnInit {
  historySong!: Song[];
  indexSongPlaying = -1;
  constructor(
    private songService: SongsServiceService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    const userToken = localStorage.getItem('token');
    if (userToken != null) {
      //render history
      this.userService.historySong.subscribe(async (historySong) => {
        this.historySong = await historySong;

        //get current song play
        this.songService.currentSongChange.subscribe((currentSongPlay) => {
          if (currentSongPlay) {
            // if historySong not empty
            if (this.historySong) {
              //get index currentSong playing in history
              this.indexSongPlaying = this.historySong.findIndex(
                (song) => song._id == currentSongPlay._id
              );
            }
          }
        });
      });
    }
  }
}
