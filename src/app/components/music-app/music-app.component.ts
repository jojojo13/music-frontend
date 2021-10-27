
import { Component, OnDestroy, OnInit } from '@angular/core';
import {   ActivatedRoute, Router } from '@angular/router';
import { AuthorizeService } from 'src/app/service/authorize.service';

import { SongsServiceService } from 'src/app/service/songs-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-music-app',
  templateUrl: './music-app.component.html',
  styleUrls: ['./music-app.component.css'],
})
export class MusicAppComponent implements OnInit,OnDestroy {
  constructor(
    private userService: UserServiceService,
    private songService: SongsServiceService,
    private auth:AuthorizeService,
    private router:ActivatedRoute,
    private route:Router
  ) {}
  ngOnDestroy(): void {
   console.log('destroyed')
  }

  ngOnInit(): void {
    this.renderSongs();
    this.getHistorySong();
    this.auth.isLoggedIn.subscribe(isLogged=>{
      console.log(isLogged)
    })
    // this.auth.isLogged.subscribe(isLogged=>{
    //   console.log('ko chay')
    //   let currentUrl = this.route.url;
    //   console.log(currentUrl)
    //   this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //       this.route.navigate(['mymusic']);
    //   });
    // })
  }
  
  getHistorySong() {
    //get all song
    
    if(this.auth.token!=null){
      this.songService.getAllsong().subscribe((songs) => {    
        //get array songID of song was listened by user
         this.userService.getUserHistorySong().subscribe((ids) => {
          // filter to get song object was listened by user
          let listSong=this.songService.getListSongbyIDs(ids, songs)
          this.userService.historySong.next(listSong);
        });
      });
    }
  }
  
  renderSongs() {
    this.songService.getSongs().subscribe((songs) => {
      this.songService.listSong=songs
      this.songService.listSongTracker.next(this.songService.listSong);

      // make heart icon color to red corresponding user's song liked if logged   
      if(this.auth.token!=null){
        this.processSongUserLiked(songs);
      }    
    });
  }
  processSongUserLiked(allSong:any) {
    //get user favorite song
    this.userService.getFavSongsOfUser().subscribe((songs: Song[]) => {
      this.userService.userFavoriteSongChange.next(songs);
      // make heart icon color to red corresponding user's song liked
      this.userService.userFavoriteSongChange.pipe().subscribe((favSongs) => {
        let indexOfCommon = this.userService.findIndexCommon(allSong, favSongs);
        this.userService.addIsLikedKeyToSong(indexOfCommon, allSong);
      });
    });
  }
  
}
