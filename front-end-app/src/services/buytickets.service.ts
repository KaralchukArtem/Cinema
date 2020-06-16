import { Injectable } from '@angular/core';
import { Timetable } from 'src/models/cinema/timetable';
import { Tickets } from 'src/models/cinema/tickets';
import { CinemaModel } from 'src/models/cinema/cinema';


@Injectable({
  providedIn: 'root'
})
export class BuyTicketsService {

  public timetable = new CinemaModel();
  public dateFilm: Date;
  public tickets = new Tickets();

  constructor() { }

  searchFilm(agr:CinemaModel, date:Date):CinemaModel{
    console.log(date + " date");
    this.timetable = agr;
    this.dateFilm = date;
    return this.timetable;
  }

}
