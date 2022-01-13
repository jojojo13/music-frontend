import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../components/music-for-you/music-for-you.component';
import { Singer } from '../interfaces/singer';

@Injectable({
  providedIn: 'root',
})
export class SingerServiceService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getSingerInfo(name: string) {
    const param = new HttpParams().set('singerName', name);
    return this.http.get<Singer>('http://localhost:3000/singer', {
      headers: this.header,
      params: param,
    });
  }

  getSingerTopHit(singerName:string){
    const param = new HttpParams().set('singerName', singerName);
    return this.http.get<Song>('http://localhost:3000/singerTopHit', {
      headers: this.header,
      params: param,
    });

  }
  getSongOfSinger(singerName:string){
    const param = new HttpParams().set('singerName', singerName);
    return this.http.get<Song[]>('http://localhost:3000/singerSong', {
      headers: this.header,
      params: param,
    });
  }

  getRandomSingers(){
    return this.http.get<Singer[]>('http://localhost:3000/randomSinger', {
      headers: this.header   
    });

  }
}
