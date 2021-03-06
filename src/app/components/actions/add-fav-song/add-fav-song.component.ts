import { Component, Input, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/app/service/authorize.service';

import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../../music-for-you/music-for-you.component';

@Component({
  selector: 'app-add-fav-song',
  templateUrl: './add-fav-song.component.html',
  styleUrls: ['./add-fav-song.component.css'],
})
export class AddFavSongComponent implements OnInit {
  @Input('data') song: Song = {
    _id: '',
    name: '',
    singer: '',
    genres: [],
    img: '',
    views: 0,
    likes: 0,
    dislikes: 0,
    link: '',
    isLiked: true,
  };
  constructor(
    private userService: UserServiceService,
    private auth: AuthorizeService
  ) {}

  ngOnInit(): void {
    this.userService.isFavoriteLoadedDone.subscribe((isDone) => {
      
      if (isDone) {
        const favSong = this.userService.yeuthich;

        const index = favSong.findIndex(
          (favSong) => favSong._id == this.song._id
        );
        if (index > -1) {
          this.song.isLiked = true;
        } else {
          this.song.isLiked = false;
        }
      }
    });
  }
  addFavorite() {
    //  if user logged in
    if (this.auth.token != null) {
      // add favor song
      this.userService
        .addUserFavoriteSongs(this.song._id)
        .toPromise()
        .then(() => {
          //get user favorite song

          // pass  to userFavoriteChange to other component detect change
          this.userService.userFavoriteChange.next(true);
        });

      // this.song.isLiked = !this.song.isLiked;
      // popup login if not logged
    } else {
      window.open('/login', 'Popup', 'width=600,height=600');
    }
  }
}
