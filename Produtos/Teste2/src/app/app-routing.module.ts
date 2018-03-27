import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistDetalheComponent } from './playlist-detalhe/playlist-detalhe.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { InfoPlaylistComponent } from './info-playlist/info-playlist.component';

const routes: Routes = [
  { path: 'playlist', component: PlaylistComponent },  
  { path: 'teste', component: InfoPlaylistComponent },  
  { path: 'playlistdetalhe/:id/:titulo', component: PlaylistDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
