import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MusicsComponent } from './components/musics/musics.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RecentlySongsComponent } from './components/recently-songs/recently-songs.component';
import { ContentComponent } from './components/content/content.component';
import { MusicForYouComponent } from './components/music-for-you/music-for-you.component';
import {MatDialogModule,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpChangeBgColorComponent } from './components/pop-up-change-bg-color/pop-up-change-bg-color.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { OptionsComponent } from './components/options/options.component';
import { MymusicComponent } from './components/mymusic/mymusic.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MusicAppComponent } from './components/music-app/music-app.component';
import { GuardGuard } from './service/guard.guard';
import { TimeSongPipe } from './pipes/time-song.pipe';
import { AddFavSongComponent } from './components/actions/add-fav-song/add-fav-song.component';
import { ChangeCurrentSongComponent } from './components/actions/change-current-song/change-current-song.component';
import { MoreComponent } from './components/actions/more/more.component';
import { ChartComponent } from './components/chart/chart.component';
import { RightbarComponent } from './components/rightbar/rightbar.component';
import { FamousSongComponent } from './components/famous-song/famous-song.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MusicsComponent,
    SidebarComponent,
    TopbarComponent,
    RecentlySongsComponent,
    ContentComponent,
    MusicForYouComponent,
    PopUpChangeBgColorComponent,
    BottomBarComponent,
    OptionsComponent,
    MymusicComponent,
    MusicAppComponent,
    TimeSongPipe,
    AddFavSongComponent,
    ChangeCurrentSongComponent,
    MoreComponent,
    ChartComponent,
    RightbarComponent,
    FamousSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [  {
    provide: MatDialogRef,
    useValue: {}
  },   { provide: MAT_DIALOG_DATA, useValue: {} },
  GuardGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
