import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../components/music-for-you/music-for-you.component';

@Injectable({
  providedIn: 'root',
})
export class SongsServiceService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
     'Accept': 'application/json',
  });

  currentSong!: Song;
  currentSongChange = new BehaviorSubject<Song>(this.currentSong);

  listSong!: Song[];
  listSongTracker = new BehaviorSubject<Song[]>(this.listSong);

  constructor(private http: HttpClient) {
  
  }

  getSongs() {
    return this.http.get<Song[]>('http://localhost:3000/songs', {
      headers: this.header,
    });
  }
  getAllsong() {
    return this.http.get<Song[]>('http://localhost:3000/allsongs', {
      headers: this.header,
    });
  }
   getAllSong() {
    return this.http.get<Song[]>('http://localhost:3000/allsongs', {
      headers: this.header,
    });
  }
  //set song before play
  bindSongDataToPlay(song: Song) {
    this.currentSong = song;
    this.currentSongChange.next(this.currentSong);
  }

  getTopViewsSong() {
    return this.http.get<Song[]>('http://localhost:3000/chart', {
      headers: this.header,
    });
  }


}
