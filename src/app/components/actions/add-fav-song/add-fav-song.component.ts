import { Component, Input, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/app/service/authorize.service';

import { UserServiceService } from 'src/app/service/user-service.service';
import { Song } from '../../music-for-you/music-for-you.component';

@Component({
  selector: 'app-add-fav-song',
  templateUrl: './add-fav-song.component.html',
  styleUrls: ['./add-fav-song.component.css']
})
export class AddFavSongComponent implements OnInit {
  @Input('data') song:Song = {
    _id: '',
    name: '',
    singer: '',
    genres: [],
    img: '',
    views: 0,
    likes: 0,
    dislikes: 0,
    link: '',
    isLiked:true
  };
  constructor(private userService:UserServiceService,private auth:AuthorizeService) {}

  ngOnInit(): void {
    
  }
  addFavorite() {
 if(this.auth.token!=null){
  this.userService.addUserFavoriteSongs(this.song._id).subscribe((data:any) =>{
    this.userService.getFavSongsOfUser().subscribe((songs:Song[]) =>{
      this.userService.userFavoriteSongChange.next(songs)
    })
  })
  this.song.isLiked=!this.song.isLiked
 }else{
  window.open('/login',"Popup", "width=600,height=600")
 }
    
   
  }

}
