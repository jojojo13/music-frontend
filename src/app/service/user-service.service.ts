import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../components/music-for-you/music-for-you.component';
import { User } from '../components/topbar/topbar.component';
import { Singer } from '../interfaces/singer';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  song!: Song[];
  userFollowing!: [];

  historySongArr!: Song[];
  historySong = new BehaviorSubject<Song[]>(this.historySongArr);

  userFavoriteChange = new BehaviorSubject<boolean>(false);
  userHistoryChange = new BehaviorSubject<boolean>(false);
  isFavoriteLoadedDone = new BehaviorSubject<boolean>(false);

  songForYou = new BehaviorSubject<Song[]>(this.song);
  favoriteSong = new BehaviorSubject<Song[]>(this.song);
  historySongs = new BehaviorSubject<Song[]>(this.song);
  yeuthich!: Song[];

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') as string,
  });

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<User>('https://music-jojojo13.herokuapp.com/user', {
      headers: this.headers,
    });
  }

  getFavSongsOfUser() {
    return this.http.get<Song[]>('https://music-jojojo13.herokuapp.com/mymusic', {
      headers: this.headers,
    });
  }

  addUserFavoriteSongs(songID: string) {
    const data = { songID: songID };
    return this.http.post('https://music-jojojo13.herokuapp.com/addSong', data, {
      headers: this.headers,
    });
  }

  getUserHistorySong() {
    return this.http.get<Song[]>('https://music-jojojo13.herokuapp.com/history', {
      headers: this.headers,
    });
  }

  pushSongToUserHistory(songID: string) {
    const data = { songID: songID };
    return this.http.post<string>('https://music-jojojo13.herokuapp.com/history', data, {
      headers: this.headers,
    });
  }

  getUnfinishedSongOfUser() {
    return this.http.get<Song>('https://music-jojojo13.herokuapp.com/unfinishedSong', {
      headers: this.headers,
    });
  }

  postUnfinishedSong(song: Song) {
    const object = { songID: song._id, timePaused: song.timePaused };
    return this.http.post<Song>('https://music-jojojo13.herokuapp.com/currentSong', object, {
      headers: this.headers,
    });
  }
  //get following singer
  getFollowingSinger() {
    return this.http.get<Singer[]>('https://music-jojojo13.herokuapp.com/getFollowingSinger', {
      headers: this.headers,
    });
  }

  //follow singer

  followSinger(singerID: string) {
    const data = { singerID: singerID };
    return this.http.post('https://music-jojojo13.herokuapp.com/followSinger', data, {
      headers: this.headers,
    });
  }
}
