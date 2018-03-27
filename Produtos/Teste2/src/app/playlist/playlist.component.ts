import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube/youtube.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  quantidade : number;

  constructor(private youtubeService: YoutubeService) { }

  items : any;

  ngOnInit() {

    this.youtubeService.ObtenhaPlayListComQuantidade()    
    .then((result : any)=>{ 
      this.items = result; 
      console.log(result);
    });
  }

  

}
