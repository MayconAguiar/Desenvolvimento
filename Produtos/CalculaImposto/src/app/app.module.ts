import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MomentModule} from 'angular2-moment/moment.module';
import {NgbModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, MomentModule, NgbModule
  ],
  providers: [NgbDropdownConfig, NgbTooltipConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
