import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carrossel-fotos-item',
  templateUrl: './carrossel-fotos-item.component.html',
  styleUrls: ['./carrossel-fotos-item.component.css']
})
export class CarrosselFotosItemComponent implements OnInit {

  @Input('caminhoImagem') caminhoImagem: string;
  
  constructor() { }

  ngOnInit() {
    debugger;
  }

}
