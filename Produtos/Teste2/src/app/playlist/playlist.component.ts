import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private http:Http) { }

  items : any;

  ngOnInit() {

    this.obtenhaPlayList()    
    .then((result : any)=>{ 
      this.items = result.json().items; 
      console.log(this.items), () => {}
    });
  }

  obtenhaPlayList(){
    let promise = new Promise((resolve, reject) => {
      let apiURL = "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCKAap-159oZbRwpPrvzdWhg&key=AIzaSyB_KiAgBotBx0DQngxlCi4NLGSznTGW9vY&maxResults=50"
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

}
