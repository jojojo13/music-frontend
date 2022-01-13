import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { MusicAppComponent } from './components/music-app/music-app.component';
import { MymusicComponent } from './components/mymusic/mymusic.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingerDetailComponent } from './components/singer-detail/singer-detail.component';
import { GuardGuard } from './service/guard.guard';
import { SingerFollowComponent } from './singer-follow/singer-follow.component';

const routes: Routes = [
  {path:'',component:MusicAppComponent,children:[
    {path:'',component:ContentComponent},
    {path:'mymusic',component:MymusicComponent,canActivate:[GuardGuard]},
    {path:'music-chart',component:ChartComponent},
    {path:'singer/:name',component:SingerDetailComponent},
    {path:'singerFollow',component:SingerFollowComponent,canActivate:[GuardGuard]}
  ]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
