import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsCinemaComponent } from './news-cinema/news-cinema.component';
import { AddCinemaComponent } from './add-cinema/add-cinema.component';
import { ViewCinemaComponent } from './view-cinema/view-cinema.component';


const routes: Routes = [
    {path: 'news', component: NewsCinemaComponent},
    {path: 'add', component: AddCinemaComponent},
    {path: 'view-cinema', component: ViewCinemaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
