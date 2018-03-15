import { Component, OnInit,  ElementRef, ViewChild } from '@angular/core';
import { ImageService } from '../image/shared/image.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-carrossel-fotos',
  templateUrl: './carrossel-fotos.component.html',
  styleUrls: ['./carrossel-fotos.component.css']
})
export class CarrosselFotosComponent implements OnInit {
  
  visibleImages: any[] = [];
  carrossel : any;
  @ViewChild('carrossel') private elementname;
  
  constructor(private nativeElement: ElementRef, private imageService: ImageService) {       
  }

  ngOnInit() {
    this.visibleImages = this.imageService.getImages();
    console.log('ngOnInit carrossel fotos');
    var _this = this;
  } 

  ngOnChanges() {
    console.log('ngOnChanges');
    
  }
  ngAfterViewChecked(){ 
    
  }
}
