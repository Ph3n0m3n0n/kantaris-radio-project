import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { ArtistListPage } from '../pages/artist-list/artist-list';
import { ArtistDetailPage } from '../pages/artist-detail/artist-detail';
import { StudioListPage } from '../pages/studio-list/studio-list';
import { StudioDetailPage } from '../pages/studio-detail/studio-detail';

import { SongListPage } from '../pages/song-list/song-list';
import { SongDetailPage } from '../pages/song-detail/song-detail';

import { FavoriteListPage } from '../pages/favorite-list/favorite-list';
import { AboutPage } from '../pages/about/about';

import { ArtistService } from "../providers/artist-service-mock";
import { StudioService } from "../providers/studio-service-mock";
import { SongService } from "../providers/songs-service-mock";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    AboutPage,
    ArtistListPage,
    ArtistDetailPage,
    FavoriteListPage,
    StudioListPage,
    StudioDetailPage,
    SongListPage,
    SongDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    AboutPage,
    ArtistListPage,
    ArtistDetailPage,
    FavoriteListPage,
    StudioListPage,
    StudioDetailPage,
    SongListPage,
    SongDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ArtistService,
    StudioService,
    SongService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
