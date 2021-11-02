import { Component, OnInit } from '@angular/core';
import { SongsServiceService } from 'src/app/service/songs-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-famous-song',
  templateUrl: './famous-song.component.html',
  styleUrls: ['./famous-song.component.css'],
})
export class FamousSongComponent implements OnInit {
  famousSongs!: Song[];
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 2,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow:'<button type="button" class="slick-prev"><i class="fas fa-chevron-left "></i></button>',
    nextArrow:'<button type="button" class="slick-next"><i class="fas fa-chevron-right "></i></button>'

  };
  constructor(private songService: SongsServiceService) {}

  async ngOnInit() {
  
      //get list song
      this.famousSongs= await this.songService.getAllSong().toPromise()

  }
}
