import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistDetalheComponent } from './playlist-detalhe/playlist-detalhe.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { InfoPlaylistComponent } from './info-playlist/info-playlist.component';
import { YoutubeService } from './youtube/youtube.service';



@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    PlaylistDetalheComponent,
    InfoPlaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule 
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
