import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsCinemaComponent } from './news-cinema/news-cinema.component';
import { AddCinemaComponent } from './add-cinema/add-cinema.component';
import { ViewCinemaComponent } from './view-cinema/view-cinema.component';
import { BuyTicketComponent } from './buy-ticket/buy-ticket.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { AdminComponent } from './account/admin/admin.component';
import { UserComponent } from './account/user/user.component';
import { TicketsPdfComponent } from './tickets-pdf/tickets-pdf.component';


const routes: Routes = [
    {path: 'news', component: NewsCinemaComponent},
    {path: 'add', component: AddCinemaComponent},
    {path: 'view-cinema', component: ViewCinemaComponent},
    {path: 'buy-ticket', component: BuyTicketComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'add-film', component: AddFilmComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'user', component: UserComponent},
    {path: 'pdf', component:TicketsPdfComponent},
    {path: '*', redirectTo: 'view-cinema', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
