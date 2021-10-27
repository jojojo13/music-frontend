import { Component, OnInit } from '@angular/core';
import { SongsServiceService } from 'src/app/service/songs-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-famous-song',
  templateUrl: './famous-song.component.html',
  styleUrls: ['./famous-song.component.css']
})
export class FamousSongComponent implements OnInit {
  famousSongs!:Song[]
  constructor(private songService:SongsServiceService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.songService.listSongTracker.subscribe(song=>{
        const shuffled = song;
        shuffled.sort(()=> 0.5-Math.random())
        this.famousSongs=shuffled.slice(0,3)
      })
    }, 1000);
    
  }

}
