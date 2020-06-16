import { Timetable } from './timetable'
import { Tickets } from './tickets';
import { Hall } from './hall';
export class CinemaModel {
    key:String;
    nameCinema: String;
    adress: String;
    number: String;
    aboutCinema: String;
      timetable = new Array<Timetable>();
      tickets = new Array<Tickets>();
      hall = new Array<Hall>();
}