import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsCinemaComponent } from './news-cinema/news-cinema.component';
import { AddCinemaComponent } from './add-cinema/add-cinema.component';
import { HttpService } from '../services/http.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ViewCinemaComponent } from './view-cinema/view-cinema.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsCinemaComponent,
    AddCinemaComponent,
    ViewCinemaComponent,
    BuyTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
