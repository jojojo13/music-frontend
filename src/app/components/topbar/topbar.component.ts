import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthorizeService } from 'src/app/service/authorize.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Color } from '../pop-up-change-bg-color/pop-up-change-bg-color.component';
export interface User {
  id:string,
  username: string;
  email: string;
  img: string;
  following:Array<string>
}
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  @ViewChild('themePicker') themePicker!: SwalComponent;
  constructor(
    private elementRef: ElementRef,
    private userService: UserServiceService,
    private auth: AuthorizeService,
    public readonly swalTargets: SwalPortalTargets
  ) {}

  user!: User;
  img = '../../../assets/images/defaultAvatar.jpg';
  async ngOnInit() {
    if (this.auth.token) {
      this.user = await this.userService.getUser().toPromise();
      this.img = this.user.img == '' ? this.img : this.user.img;
     
  
    }
  }
  signOut() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  update(color: Color) {
    const topbar =
      this.elementRef.nativeElement.ownerDocument.querySelector('.topbar');
    const bottombar =
      this.elementRef.nativeElement.ownerDocument.querySelector('.bottombar');
    const body = this.elementRef.nativeElement.ownerDocument.body;
    const rightbar =
      this.elementRef.nativeElement.ownerDocument.querySelector('.rightbar');
    topbar.style.backgroundColor = color.value1;
    bottombar.style.backgroundColor = color.value2;
    rightbar.style.backgroundColor = color.value3;
    body.style.backgroundColor = color.value1;
    this.themePicker.update({ background: color.value3 });
  }

  popUpDialog() {
    this.themePicker.fire();
  }
}
