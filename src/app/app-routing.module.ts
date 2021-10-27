import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { MusicAppComponent } from './components/music-app/music-app.component';
import { MymusicComponent } from './components/mymusic/mymusic.component';
import { GuardGuard } from './service/guard.guard';

const routes: Routes = [
  {path:'',component:MusicAppComponent,children:[
    {path:'',component:ContentComponent},
    {path:'mymusic',component:MymusicComponent,canActivate:[GuardGuard]},
    {path:'music-chart',component:ChartComponent}
  ]},
  {path:'login',component:LoginComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
