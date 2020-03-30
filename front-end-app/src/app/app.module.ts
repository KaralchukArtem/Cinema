import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsCinemaComponent } from './news-cinema/news-cinema.component';
import { AddCinemaComponent } from './add-cinema/add-cinema.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsCinemaComponent,
    AddCinemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
