import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/app/service/authorize.service';
import { SongsServiceService } from 'src/app/service/songs-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  topSongs!: Song[];
  isLoadedDone=false
  constructor(
    private songService: SongsServiceService,

  ) {}

  ngOnInit(): void {
    this.songService.getTopViewsSong().subscribe((topSongs: Song[]) => {
      this.topSongs = topSongs;
      this.isLoadedDone=true
    });
  }
}
