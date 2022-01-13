import { MusicForYouComponent } from './../music-for-you/music-for-you.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Singer } from 'src/app/interfaces/singer';
import { AuthorizeService } from 'src/app/service/authorize.service';
import { SingerServiceService } from 'src/app/service/singer-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { FollowBtnComponent } from '../actions/follow-btn/follow-btn.component';
import { LoaderComponent } from '../actions/loader/loader.component';
import { Song } from '../music-for-you/music-for-you.component';


@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.css'],
})
export class SingerDetailComponent implements OnInit {
  @ViewChild('loadingBar') loadingBar!: LoaderComponent;
  @ViewChild('loadingOnChange') loadingOnChange!: LoaderComponent;
  @ViewChild('followBtn') followBtn!: FollowBtnComponent;
  @ViewChild('suggestedSongs') suggestedSongs!: MusicForYouComponent;
  
  singer: Singer = {
    _id: '',
    name: '',
    description: '',
    follow: 0,
    img: '',
  };
  top1Song: Song = {
    _id: '',
    name: '',
    singer: '',
    genres: [],
    img: '',
    views: 0,
    likes: 0,
    dislikes: 0,
    link: '',
  };
  singerSongs!:Song[]
  constructor(
    private singerService: SingerServiceService,
    private route: ActivatedRoute,
    private auth: AuthorizeService,
    private userService: UserServiceService
  ) {}

  async ngOnInit() {
    //get singer name from route params
    const singerName = this.route.snapshot.params['name'];

    //get singer info
    this.renderSingerInfo(singerName);

    this.checkIsFollowed();

    //get singer top hit
    await this.singerService.getSingerTopHit(singerName).subscribe((song) => {
    
      this.top1Song = song;
    });
    await this.singerService.getSongOfSinger(singerName).subscribe(songs=>{
      this.singerSongs=songs
      this.suggestedSongs.title="Bài hát liên quan"
      this.suggestedSongs.songs=songs
    })
  }

  renderSingerInfo(singerName: string) {
    this.singerService.getSingerInfo(singerName).subscribe((singer) => {
      this.singer = singer;
      this.loadingBar.isLoaded = true;
    });
  }

  follow() {
    // start animation loading when user click follow
  
    if (this.auth.token != null) {
      this.loadingOnChange.isLoaded = false;
      this.followBtn.showIcon = false;
      const singerName = this.route.snapshot.params['name'];
      this.userService.followSinger(this.singer._id).subscribe(() => {
        this.renderSingerInfo(singerName);
        this.checkIsFollowed();
      });
    } else {
      window.open('/login', 'popup', 'width=600,height=600');
    }
  }

  checkIsFollowed() {
    //login or not
    if (this.auth.token) {
      this.userService.getUser().subscribe((userInfo) => {
        // check if singer is followed by singer
        if (userInfo.following.includes(this.singer._id)) {
          this.followBtn.isFollowed = true;
        } else {
          this.followBtn.isFollowed = false;
        }
        this.loadingOnChange.isLoaded = true;
        this.followBtn.showIcon = true;
      });
    }
  }
}
