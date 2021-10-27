import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SongsServiceService } from 'src/app/service/songs-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { delay } from "rxjs/operators";
export interface Song {
  _id: string;
  name: string;
  singer: string;
  genres: [];
  img: string;
  views: number;
  likes: number;
  dislikes: number;
  link: string;
  [key:string]:any
}

@Component({
  selector: 'app-music-for-you',
  templateUrl: './music-for-you.component.html',
  styleUrls: ['./music-for-you.component.css'],
})
export class MusicForYouComponent implements OnInit,AfterViewInit {
  songs!: Song[];

  constructor(
    private songService: SongsServiceService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.songService.listSongTracker.subscribe(songs=>{
      this.songs=songs     
    })
   
  }
  ngAfterViewInit():void {
 
  }


}
