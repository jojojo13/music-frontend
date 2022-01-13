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
    return this.http.get<User>('http://localhost:3000/user', {
      headers: this.headers,
    });
  }

  getFavSongsOfUser() {
    return this.http.get<Song[]>('http://localhost:3000/mymusic', {
      headers: this.headers,
    });
  }

  addUserFavoriteSongs(songID: string) {
    const data = { songID: songID };
    return this.http.post('http://localhost:3000/addSong', data, {
      headers: this.headers,
    });
  }

  getUserHistorySong() {
    return this.http.get<Song[]>('http://localhost:3000/history', {
      headers: this.headers,
    });
  }

  pushSongToUserHistory(songID: string) {
    const data = { songID: songID };
    return this.http.post<string>('http://localhost:3000/history', data, {
      headers: this.headers,
    });
  }

  getUnfinishedSongOfUser() {
    return this.http.get<Song>('http://localhost:3000/unfinishedSong', {
      headers: this.headers,
    });
  }

  postUnfinishedSong(song: Song) {
    const object = { songID: song._id, timePaused: song.timePaused };
    return this.http.post<Song>('http://localhost:3000/currentSong', object, {
      headers: this.headers,
    });
  }
  //get following singer
  getFollowingSinger() {
    return this.http.get<Singer[]>('http://localhost:3000/getFollowingSinger', {
      headers: this.headers,
    });
  }

  //follow singer

  followSinger(singerID: string) {
    const data = { singerID: singerID };
    return this.http.post('http://localhost:3000/followSinger', data, {
      headers: this.headers,
    });
  }
}
