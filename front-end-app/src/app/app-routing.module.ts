import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsCinemaComponent } from './news-cinema/news-cinema.component';
import { AddCinemaComponent } from './add-cinema/add-cinema.component';


const routes: Routes = [
    {path: 'news', component: NewsCinemaComponent},
    {path: 'add', component: AddCinemaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
