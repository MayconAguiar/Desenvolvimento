import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class YoutubeService {

  lista: Array<any> = [];
  constructor(private http:Http) { }

  private obtenhaPlayList(){
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

  ObtenhaPlayListComQuantidade() {
    let promise = new Promise((resolve, reject) => {
      
      this.obtenhaPlayList()    
      .then((result : any)=>{ 
        
        result.json().items.forEach(element => {          
          this.obtenhaQuantidade(element.id).then((quantidade : any)=>{
              if (quantidade > 0){
                this.lista.push({ element, quantidade });  
                this.lista.sort(function(a, b){
                  if ( a.element.snippet.publishedAt > b.element.snippet.publishedAt )
                  return -1;
                  if ( a.element.snippet.publishedAt < b.element.snippet.publishedAt )
                      return 1;
                  return 0
                })
              }
           });

          resolve(this.lista);
        });
      });
    });

    return promise;
  }

  obtenhaQuantidade(id) {
    let promise = new Promise((resolve, reject) => {
      this.obtenhaVideos(id)    
      .then((result : any)=>{ 
        resolve(result.json().items.length);
      });
    
    });
    return promise;
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

}
