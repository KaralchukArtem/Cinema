import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsCinemaComponent } from './news-cinema/news-cinema.component';
import { AddCinemaComponent } from './add-cinema/add-cinema.component';
import { ViewCinemaComponent } from './view-cinema/view-cinema.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';


const routes: Routes = [
    {path: 'news', component: NewsCinemaComponent},
    {path: 'add', component: AddCinemaComponent},
    {path: 'view-cinema', component: ViewCinemaComponent},
    {path: 'buy-ticket/:time', component: BuyTicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
