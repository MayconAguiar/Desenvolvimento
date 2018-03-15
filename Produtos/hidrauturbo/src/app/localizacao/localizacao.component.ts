declare var $ :any;   // not required
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})
export class LocalizacaoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  ngAfterViewChecked() {
    
    // var gmaps : any = $("google-maps");

    // setTimeout(() => {      
    //   console.log(gmaps);
    //   gmaps.find(".place-name").innerText = "Hidrau Turbo";
    // }, 2000);
    
  }

}
