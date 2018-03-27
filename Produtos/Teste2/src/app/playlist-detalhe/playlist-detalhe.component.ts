import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../youtube/youtube.service';

@Component({
  selector: 'app-playlist-detalhe',
  templateUrl: './playlist-detalhe.component.html',
  styleUrls: ['./playlist-detalhe.component.css']
})
export class PlaylistDetalheComponent implements OnInit {

  id: number;
  titulo: string;
  private sub: any;
  private items : any;
  


  constructor(private youtubeService: YoutubeService, private route: ActivatedRoute) { }

  ngOnInit() {

    

    this.sub = this.route.params.subscribe(params => {
      
      this.id = params['id'];
      this.titulo = params['titulo'];

      var that = this;
      this.youtubeService.obtenhaVideos(this.id)    
      .then((result : any)=>{ 
        that.items = result.json().items; 
        console.log(that.items);
      });
   });
  }  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
