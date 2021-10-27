import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

import { SongsServiceService } from 'src/app/service/songs-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css'],
})

export class BottomBarComponent implements OnInit, AfterViewInit,OnDestroy {
  song: Song = {
    _id: '',
    name: '',
    singer: '',
    genres: [],
    img: '',
    views: 0,
    likes: 0,
    dislikes: 0,
    link: '',
    isLiked: false,
  };
  durationSong = 0;
  time = 0;
  isPlaying = false;
  constructor(
    private elementRef: ElementRef,
    private songservice: SongsServiceService,
    private userService:UserServiceService
  ) {}
  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {
    let index = 0;
    //get audio
    const audio: HTMLAudioElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('audio');
    //get icon
    var musicList = document.querySelector('.musicList') as HTMLElement;
    //get rightbar - history song
    var rightbar = document.querySelector('.rightbar') as HTMLElement;
    //get progress bar
    const progressBar: HTMLProgressElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('.progress');
    // get play btn
    const playBtn: HTMLAudioElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('.playBtn');
    //get cd
    const disk: HTMLElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('.cd');
    const nextBtn: HTMLElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('.nextBtn');
    const preBtn: HTMLElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('.preBtn');

    //playlist

    const music = {
      init: () => {  
        this.songservice.currentSongChange.subscribe((currentSong: Song) => {
          if (currentSong) {
            this.isPlaying = true;
            this.song = currentSong;
            disk.style.backgroundImage = `url('${currentSong.img}')`;
            audio.src = currentSong.link;
            audio.play();
          }
        });
      },

      handleEvents: () => {
        //pause or play audio
        playBtn.onclick = () => {
          if (this.isPlaying) {
            audio.pause();
          } else {
            audio.play();
          }
        };

        //play animation when audio play
        audio.onplay = () => {
          this.isPlaying = true;
          disk.style.animationPlayState = 'running';
        };

        //paused animation when audio paused
        audio.onpause = () => {
          this.isPlaying = false;
          disk.style.animationPlayState = 'paused';
        };

        //update duration song
        audio.onloadeddata = () => {
          this.durationSong = audio.duration;
        };

        //update progressbar on time
        audio.ontimeupdate = () => {
          this.time = audio.currentTime;
          const value = (this.time / this.durationSong) * 100;
          progressBar.value = value;
        };

        //rewind or fast forward
        progressBar.onchange = (e) => {
          const progressValue = (e.target as HTMLProgressElement).value;
          const seekTime = (this.durationSong / 100) * progressValue;
          audio.currentTime = seekTime;
        };

        //show or hide list history's song
        musicList.onclick = () => {
          rightbar?.classList.toggle('active');
          if (rightbar?.classList.contains('active')) {
            rightbar.style.transform = 'translateX(0)';
          } else {
            rightbar.style.transform = 'translateX(280px)';
          }
        };

        nextBtn.onclick = () => {
          if (index == this.userService.historySongArr.length - 1) {
            index = 0;
          } else {
            index++;
          }
          music.loadCurrentSong();
        };
        preBtn.onclick = () => {
          if (index == 0) {
            index = this.userService.historySongArr.length - 1;
          } else {
            index--;
          }
          music.loadCurrentSong();
        };
      },
      loadCurrentSong: () => {
        let listSong = this.userService.historySongArr;
        this.song = listSong[index];
        this.songservice.currentSongChange.next(this.song);
      },

      setIndexCurrentSong: () => {
        this.userService.historySong.subscribe((songs) => {
          if (songs) {
            this.songservice.currentSongChange.subscribe((currentSong) => {
              if (currentSong) {
                index = songs.findIndex((song) => song._id == currentSong._id);
              }
            });
          }
        });
      },
      start: () => {
        music.setIndexCurrentSong();
        music.init();
        music.handleEvents();
      },
    };
    music.start();
  }
  ngAfterViewInit(): void {}
}
