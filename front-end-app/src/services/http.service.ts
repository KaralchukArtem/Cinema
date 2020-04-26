import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
   
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
        busy: Number,
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
        return this.http.get(`http://localhost:3000/db-view-cinema`);
    }

    getBuyTicket(
        //...updating hall
        amount: Number,
        vacancy: Number,
        busy: Number,
        //...creating new tickets
        nameCinema: String,
        film: String,
        date: String,
        time: String,
        cost: String,
        nameHall: String,
        number_of_tickets: String,
    ){
        const params = new HttpParams()
        .set('amount', amount.toString())
        .set('vacancy', vacancy.toString())
        .set('busy', busy.toString())
        .set('nameCinema', nameCinema.toString())
        .set('film', film.toString())
        .set('date', date.toString())
        .set('time', time.toString())
        .set('cost', cost.toString())
        .set('nameHall', nameHall.toString())
        .set('number_of_tickets', number_of_tickets.toString());
        return this.http.get('http://localhost:3000/buy-ticket', {params});
    }
}