import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/app/service/authorize.service';
import { SongsServiceService } from 'src/app/service/songs-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';


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
    this.getSongForYou();
    this.getSongFavorite();
    this.getHistory();
  }

  getSongForYou() {
    this.songService
      .getSongs()
      .toPromise()
      .then((songs) => {
        this.userService.songForYou.next(songs);
      });
  }

  getSongFavorite() {
    //get favorite song if logged
    if (this.auth.token != null) {
      //recall api if user add/remove favorite song
      this.userService.userFavoriteChange.subscribe((isChange) => {
        this.userService
          .getFavSongsOfUser()
          .toPromise()
          .then((favSongs) => {
            this.userService.favoriteSong.next(favSongs);
            this.userService.yeuthich = favSongs;
            this.userService.isFavoriteLoadedDone.next(true);
          });
      });
    }
  }

  getHistory() {
    //get history songs if logged
    if (this.auth.token != null) {
      // recall api to load history if user listen new song
      this.userService.userHistoryChange.subscribe((isChange) => {
        // load history song from server
        this.userService
          .getUserHistorySong()
          .toPromise()
          .then((songs) => {
            // bind
            this.userService.historySongs.next(songs);
          });
      });
    }
  }
}
