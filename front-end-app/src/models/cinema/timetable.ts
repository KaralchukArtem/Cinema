import { Film } from './film';
import { Hall } from './hall';

export class Timetable {
    time: String;
    date: Date;
    film = new Film(); 
    hall = new Hall();
}