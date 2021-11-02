import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/app/service/authorize.service';
import { SongsServiceService } from 'src/app/service/songs-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-music-app',
  templateUrl: './music-app.component.html',
  styleUrls: ['./music-app.component.css'],
})
export class MusicAppComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserServiceService,
    private songService: SongsServiceService,
    private auth: AuthorizeService
  ) {}
  ngOnDestroy(): void {
    console.log('destroyed');
  }

  ngOnInit(): void {
    this.renderSongs();
    this.getHistorySong();
  }

  async getHistorySong() {
    //get all song
    const allSong = await this.songService.getAllSong().toPromise();
    //get array songID of song was listened by user

    if (this.auth.token != null) {
      const historySongIDs = await this.userService
        .getUserHistorySong()
        .toPromise();
      //if user logged in
      // filter to get songs was listened by user
      this.userService.historySongArr = this.songService.getListSongbyIDs(
        historySongIDs,
        allSong
      );
      // bind to BehaviorSubject historySong to detect change
      this.userService.historySong.next(this.userService.historySongArr);
    }
  }

  async renderSongs() {
    // this.songService.listSong = await this.songService.getAllSong().toPromise();
    //get songForYou to pass music-for-you component
    const songForyou = await this.songService.getSongs().toPromise();
    // make heart icon color to red corresponding user's song liked if logged
    if (this.auth.token != null) {
      this.processSongUserLiked(songForyou);
    }
    this.songService.listSongTracker.next(songForyou);
  }

  async processSongUserLiked(allSong: any) {
    //get user favorite song
    const favSongs = await this.userService.getFavSongsOfUser().toPromise();
    this.userService.userFavoriteSongChange.next(favSongs);
    // make heart icon color to red corresponding user's song liked
    this.userService.userFavoriteSongChange.pipe().subscribe((favSongs) => {
      let indexOfCommon = this.userService.findIndexCommon(allSong, favSongs);
      this.userService.addIsLikedKeyToSong(indexOfCommon, allSong);
    });
  }
}
