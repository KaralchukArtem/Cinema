import { Injectable } from '@angular/core';
import { Timetable } from 'src/models/cinema/timetable';
import { Tickets } from 'src/models/cinema/tickets';
import { CinemaModel } from 'src/models/cinema/cinema';
import { Film } from 'src/models/cinema/film';


@Injectable({
  providedIn: 'root'
})
export class BuyTicketsService {

  public film = new Film();
  public tickets = [];
  public Date: Date;

  constructor() { }

  searchFilm(agr:Film){
    this.film = agr;
    console.log(this.film.name + " service");
  }

}
