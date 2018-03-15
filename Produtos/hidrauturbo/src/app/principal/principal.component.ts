import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import '../../../node_modules/owl.carousel/dist/owl.carousel.js';
import { Observable } from 'rxjs/Observable';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  carrossel : any;
  constructor() { }

  estaInicializando : any;

  ngOnInit() {
      // this.estaInicializando = true;
      // console.log('ngOnInit Principal');

      // document.addEventListener("owlcarouselCarregado", function () {
      //   console.log("teste owlcarouselCarregado");
      // });
    
      // $(document).on("owlcarouselCarregado", function() { console.log("teste owlcarouselCarregado") ;});

      // var carousel: any = $('.owl-carousel');
      // carousel.owlCarousel({
      //     loop:false,
      //     margin:10,
      //     autoplay: true,    
      //     responsive:{
      //         0:{
      //             items:1
      //         },
      //         600:{
      //             items:1
      //         },
      //         1000:{
      //             items:1
      //         }
      //     }
      // });
  }

  testeObservable (): Observable<any> {
    return null;
  }

  ngOnChanges() {
    console.log('alterado');
  }
  ngAfterViewInit(){
    
    
  }
}
