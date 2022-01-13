import { Component, OnInit } from '@angular/core';
import { Singer } from '../interfaces/singer';
import { AuthorizeService } from '../service/authorize.service';
import { SingerServiceService } from '../service/singer-service.service';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-singer-follow',
  templateUrl: './singer-follow.component.html',
  styleUrls: ['./singer-follow.component.css']
})
export class SingerFollowComponent implements OnInit {

  listSinger!:Singer[]
  constructor(private user:UserServiceService,private auth:AuthorizeService,private singer:SingerServiceService) { }

  async ngOnInit() {
    if(this.auth.token!=null){
      this.user.getFollowingSinger().subscribe(singers=>{
        this.listSinger=singers
      })
    }else{
      this.listSinger=await this.singer.getRandomSingers().toPromise()
    }
   
  }

}
