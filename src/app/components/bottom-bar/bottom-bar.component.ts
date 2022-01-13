import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthorizeService } from 'src/app/service/authorize.service';

import { SongsServiceService } from 'src/app/service/songs-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../music-for-you/music-for-you.component';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css'],
})
export class BottomBarComponent implements OnInit, AfterViewInit, OnDestroy {
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
    private userService: UserServiceService,
    private auth: AuthorizeService
  ) {}
  ngOnDestroy(): void {}

  async ngOnInit() {
    let index = 0;
    //get token

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
    //get cd to make animate
    const disk: HTMLElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('.cd');


    // get play btn
    const playBtn: HTMLAudioElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('.playBtn');
    //get nextBtn
    const nextBtn: HTMLElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('.nextBtn');
    //get previousBtn
    const preBtn: HTMLElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('.preBtn');
    //get pauseBtn
    const pauseBtn: HTMLElement =
      this.elementRef.nativeElement.ownerDocument.querySelector('.pauseBtn');
    let unfinishedSong: any;
    //load unfinished song of user in last access website
    if (this.auth.token) {
      unfinishedSong = await this.userService
        .getUnfinishedSongOfUser()
        .toPromise();
    }

    const music = {
      init: () => {
        // currentSong= unfinishedSong
        if (unfinishedSong) {
          this.songservice.currentSongChange.next(unfinishedSong);
        }
        this.songservice.currentSongChange.subscribe(
          (currentSongPlay: Song) => {
            if (currentSongPlay) {
              //bind to html
              this.song = currentSongPlay;
              disk.style.backgroundImage = `url('${currentSongPlay.img}')`;
              audio.src = currentSongPlay.link;

              if (!currentSongPlay.hasOwnProperty('timePaused')) {
                audio.currentTime = 0;
                audio.play();
              } else {
                audio.currentTime = currentSongPlay.timePaused;
              }
            }
          }
        );
      },

      handleEvents: () => {
        //pause or play audio
        playBtn.onclick = () => {
          audio.play();
        };
        pauseBtn.onclick = () => {
          audio.pause();
        };
        //play animation when audio play
        audio.onplay = () => {
          this.isPlaying = true;
          disk.style.animationPlayState = 'running';
          pauseBtn.style.visibility = 'visible';
          playBtn.style.visibility = 'hidden';
        };
        //paused animation when audio paused
        audio.onpause = () => {
          this.isPlaying = false;
          disk.style.animationPlayState = 'paused';
          playBtn.style.visibility = 'visible';
          pauseBtn.style.visibility = 'hidden';
          
          //assign timePaused  to object this.song
          this.song.timePaused = Math.round(audio.currentTime);
          //post to server
          if (this.auth.token) {
            this.userService.postUnfinishedSong(this.song).toPromise();
          }
        };

        //update duration song
        audio.onloadeddata = () => {
          this.durationSong = audio.duration;
          const value = Math.round((this.time / this.durationSong) * 100);
          progressBar.value = value;
        };

        //update progressbar on time
        audio.ontimeupdate = () => {
          this.time = audio.currentTime;
          const value = Math.round((this.time / this.durationSong) * 100);
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
        //next song in history
        nextBtn.onclick = () => {
          this.userService.historySongs.subscribe((songs) => {
            if (index == songs.length - 1) {
              index = 0;
            } else {
              index++;
            }
          });
          music.loadCurrentSong();
        };
        //previous song in history
        preBtn.onclick = () => {
          this.userService.historySongs.subscribe((songs) => {
            if (index == 0) {
              index = songs.length - 1;
            } else {
              index--;
            }
          });
          music.loadCurrentSong();
        };

        // post current song to server if song not completed before window closed
        if (this.auth.token) {
          window.onbeforeunload = (event) => {
            // if close widow when audio playing
            if (this.isPlaying == true) {
              //assign timePaused  to object this.song
              this.song.timePaused = Math.round(audio.currentTime);
              //post to server
              this.userService.postUnfinishedSong(this.song).toPromise();
              //confirm dialog to close or not
              event.returnValue = true;
            }
            return;
          };
        }
      },
      loadCurrentSong: () => {
        this.userService.historySongs.subscribe((songs) => {
          let listSong = songs;
          this.song = listSong[index];
          this.songservice.currentSongChange.next(this.song);
        });
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
