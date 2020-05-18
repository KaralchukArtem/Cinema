import { Timetable } from './timetable'
import { Tickets } from './tickets';
export class CinemaModel {
    key:String;
    nameCinema: String;
    adress: String;
    number: String;
    aboutCinema: String;
      timetable: Timetable[];
      tickets: Tickets[];
}