import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import your library
import { OwlModule } from 'ng2-owl-carousel';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // <-- #1 import module


import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { CarrosselFotosComponent } from './carrossel-fotos/carrossel-fotos.component';
import { CarrosselFotosItemComponent } from './carrossel-fotos-item/carrossel-fotos-item.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageComponent } from './image/image.component';
import { routing } from '../routing';
import { ImageService } from './image/shared/image.service';
import { MenuComponent } from './menu/menu.component';
import { ServicosComponent } from './servicos/servicos.component';
import { HeaderComponent } from './header/header.component';
import { Menu2Component } from './menu2/menu2.component';
import { PecasComponent } from './pecas/pecas.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { ContatoComponent } from './contato/contato.component';
import { CarrosselComponent } from './carrossel/carrossel.component';
import { TelefonesComponent } from './telefones/telefones.component';
import { RodapeComponent } from './rodape/rodape.component';
import { Http } from '@angular/http';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { ContatoWhatsappComponent } from './contato-whatsapp/contato-whatsapp.component';





@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,    
    CarrosselFotosComponent, 
    CarrosselFotosItemComponent, 
    GalleryComponent,
     ImageComponent,
     MenuComponent,
     ServicosComponent,
     HeaderComponent,
     Menu2Component,
     PecasComponent,
     EmpresaComponent,
     ContatoComponent,
     CarrosselComponent,
     TelefonesComponent,
     RodapeComponent,
     LocalizacaoComponent,
     ContatoWhatsappComponent    
  ],
  imports: [
    BrowserModule, OwlModule,routing, ReactiveFormsModule, FormsModule, HttpClientModule, HttpModule ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
