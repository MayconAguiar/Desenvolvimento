import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MomentModule} from 'angular2-moment/moment.module';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDashboardComponent } from './item-dashboard/item-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ItemDashboardComponent
  ],
  imports: [
    BrowserModule, MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
