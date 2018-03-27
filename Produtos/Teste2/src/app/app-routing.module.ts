import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistDetalheComponent } from './playlist-detalhe/playlist-detalhe.component';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [
  { path: 'playlist', component: PlaylistComponent },
  { path: 'playlistdetalhe/:id', component: PlaylistDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
