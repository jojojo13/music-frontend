import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {
  @Input('data') song: Song = {
    _id: '',
    name: '',
    singer: '',
    genres: [],
    img: '',
    views: 0,
    likes: 0,
    dislikes: 0,
    link: '',
    isLiked: true,
  };
  constructor() {}

  ngOnInit(): void {}
}
