import { Timetable } from './timetable'
import { Tickets } from './tickets';
import { Hall } from './hall';
export class CinemaModel {
    key:String;
    nameCinema: String;
    adress: String;
    number: String;
    aboutCinema: String;
      timetable: Timetable[];
      tickets: Tickets[];
      hall: Hall[];
}