import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Timetable } from 'src/models/cinema/timetable';
import { AccountModel } from 'src/models/account/account';
import { Tickets } from 'src/models/cinema/tickets';
import { Film } from 'src/models/cinema/film';
   
@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
      
    getSum(
        // CinemaSchema
        nameCinema: String,
        adress: String,
        number: String,
        aboutCinema: String,
        // TimeTableSchema
        time: String,
        date: String,
        // FilmSchema
        name: String,
        long: Number,
        IMDb: Number,
        about: String,
        // HallSchema
        nameHall: String,
        amount: Number,
        vacancy: Number,
        busy: Number
        ){
        const params = new HttpParams()
        .set('nameCinema', nameCinema.toString())
        .set('adress', adress.toString())
        .set('number', number.toString())
        .set('aboutCinema', aboutCinema.toString())
        .set('time', time.toString())
        .set('date', date.toString())
        .set('name', name.toString())
        .set('long', long.toString())
        .set('IMDb', IMDb.toString())
        .set('about', about.toString())
        .set('nameHall', nameHall.toString())
        .set('amount', amount.toString())
        .set('vacancy', vacancy.toString())
        .set('busy', busy.toString());
        return this.http.get('http://localhost:3000/db-save', {params});
    }

    getCinema(){
        return this.http.get('http://localhost:3000/db-view-cinema');
    }

    postUpdateHall(
        timetable:Timetable
    ){
        const body:Timetable = timetable;
        console.log("postUpdateHall -callback" + body);
        return this.http.post('http://localhost:3000/updateHall', body);
    }
    
    postCreateTicket(
        ticket:Tickets
    ){
        const body:Tickets = ticket;
        console.log("postCreateTicket -callback" + body);
        return this.http.post('http://localhost:3000/createTicket', body);
    }

    postRegistration( account:AccountModel )
    {
        const body:AccountModel = account;
        console.log("postRegistration -callback" + body);
        return this.http.post('http://localhost:3000/registration', body);
    }

    getLogin(
        email:String,
        password:String
    ){
        console.log("login");
        const params = new HttpParams()
        .set('password',password.toString())
        .set('email',email.toString());
        return this.http.get('http://localhost:3000/login',{params});
    }

    postAddTimetable( timetable:Timetable )
    {
        const body:Timetable = timetable;
        console.log("postAdd -callback" + body);
        return this.http.post('http://localhost:3000/db-save-timetable', body); 
    }

    postAddFilm( film:Film )
    {
        const body:Film = film;
        console.log("postAdd -callback" + body);
        return this.http.post('http://localhost:3000/db-save-film', body); 
    }

    getViewFilm( name: String){
        console.log("getViewFilm");
        const params = new HttpParams()
        .set('password',name.toString());
        return this.http.get('http://localhost:3000/login',{params});
    }
    
}