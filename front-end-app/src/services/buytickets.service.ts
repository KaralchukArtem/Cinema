import { Injectable } from '@angular/core';
import { Timetable } from 'src/models/cinema/timetable';


@Injectable({
  providedIn: 'root'
})
export class BuyTicketsService {

  public timetable:Timetable;
  public dateFilm: Date;

  constructor() { }

  searchFilm(agr:Timetable, date:Date):Timetable{
    console.log(agr.film.name + " agr");
    console.log(agr.time + " time");
    console.log(date + " date");
    this.timetable = agr;
    this.dateFilm = date;
    return this.timetable[0];
  }

}
