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
    return this.http.get<User>('https://jojojomusic.up.railway.app/user', {
      headers: this.headers,
    });
  }

  getFavSongsOfUser() {
    return this.http.get<Song[]>('https://jojojomusic.up.railway.app/mymusic', {
      headers: this.headers,
    });
  }

  addUserFavoriteSongs(songID: string) {
    const data = { songID: songID };
    return this.http.post('https://jojojomusic.up.railway.app/addSong', data, {
      headers: this.headers,
    });
  }

  getUserHistorySong() {
    return this.http.get<Song[]>('https://jojojomusic.up.railway.app/history', {
      headers: this.headers,
    });
  }

  pushSongToUserHistory(songID: string) {
    const data = { songID: songID };
    return this.http.post<string>('https://jojojomusic.up.railway.app/history', data, {
      headers: this.headers,
    });
  }

  getUnfinishedSongOfUser() {
    return this.http.get<Song>('https://jojojomusic.up.railway.app/unfinishedSong', {
      headers: this.headers,
    });
  }

  postUnfinishedSong(song: Song) {
    const object = { songID: song._id, timePaused: song.timePaused };
    return this.http.post<Song>('https://jojojomusic.up.railway.app/currentSong', object, {
      headers: this.headers,
    });
  }
  //get following singer
  getFollowingSinger() {
    return this.http.get<Singer[]>('https://jojojomusic.up.railway.app/getFollowingSinger', {
      headers: this.headers,
    });
  }

  //follow singer

  followSinger(singerID: string) {
    const data = { singerID: singerID };
    return this.http.post('https://jojojomusic.up.railway.app/followSinger', data, {
      headers: this.headers,
    });
  }
}
