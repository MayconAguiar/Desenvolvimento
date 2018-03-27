import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-playlist-detalhe',
  templateUrl: './playlist-detalhe.component.html',
  styleUrls: ['./playlist-detalhe.component.css']
})
export class PlaylistDetalheComponent implements OnInit {

  id: number;
  private sub: any;
  private items : any;
  


  constructor(private http:Http, private route: ActivatedRoute) { }

  ngOnInit() {

    

    this.sub = this.route.params.subscribe(params => {
      
      this.id = params['id'];

      var that = this;
      this.obtenhaVideos(this.id)    
      .then((result : any)=>{ 
        that.items = result.json().items; 
        console.log(that.items), () => {}
      });
   });
  }

  obtenhaVideos(id){
    let promise = new Promise((resolve, reject) => {
      let apiURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + id + "&maxResults=50&key=AIzaSyB_KiAgBotBx0DQngxlCi4NLGSznTGW9vY";
      this.http.get(apiURL)
        .toPromise()
        .then(
          res => {             
            // Success
            resolve(res);
          }
        );
    });
    return promise;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
