import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../components/music-for-you/music-for-you.component';
import { User } from '../components/topbar/topbar.component';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  userFavoriteSongs: Song[] = [];
  userFavoriteSongChange = new BehaviorSubject<any>(this.userFavoriteSongs);

  historySongArr!: Song[];
  historySong = new BehaviorSubject<Song[]>(this.historySongArr);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') as string,
  });

  constructor(private http: HttpClient) {}

  getUser(){
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
    return this.http.get<string[]>('http://localhost:3000/history', {
      headers: this.headers,
    });
  }
  pushSongToUserHistory(songID: string) {
    const data = { songID: songID };
    return this.http.post<string[]>('http://localhost:3000/history', data, {
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

  // find index common between user's favorite songs and list of songs
  findIndexCommon(a1: Song[], a2: Song[]) {
    let arrInd = [];

    for (let i = 0; i < a1.length; i++) {
      for (let j = 0; j < a2.length; j++) {
        if (a2[j]._id == a1[i]._id) {
          arrInd.push(i);
        }
      }
    }
    return arrInd;
  }

  addIsLikedKeyToSong(indexArr: number[], song: Song[]) {
    const newKey: keyof Song = 'isLiked';

    //remove song.isLiked
    song.forEach((song) => {
      song[newKey] = false;
    });

    indexArr.map((item: number) => {
      song[item][newKey] = true;
    });
  }

}
