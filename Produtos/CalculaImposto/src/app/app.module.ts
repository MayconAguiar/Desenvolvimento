import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MomentModule} from 'angular2-moment/moment.module';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
