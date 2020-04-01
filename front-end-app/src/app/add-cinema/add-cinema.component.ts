import { Component, OnInit} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CinemaModel } from '../../models/cinema'

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.less']
})
export class AddCinemaComponent{

    // CinemaSchema
    nameCinema: String
    adress: String
    number: String
    aboutCinema: String
    // TimeTableSchema
    time: String
    date: String
    // FilmSchema
    name: String
    long: Number
    IMDb: Number
    about: String
    // HallSchema
    nameHall: String
    amount: Number
    vacancy: Number
    busy: Number
    
    done:boolean = false 

    public ex: CinemaModel
    //
    model: any;
    constructor(private httpService: HttpService){}

    submit(){
        this.httpService.getSum(
            // CinemaSchema
            this.nameCinema,
            this.adress,
            this.number,
            this.aboutCinema,
            // TimeTableSchema
            this.time,
            this.date,
            // FilmSchema
            this.name,
            this.long,
            this.IMDb,
            this.about,
            // HallSchema
            this.nameHall,
            this.amount,
            this.vacancy,
            this.busy
        )
        .subscribe((data:any) => {
            this.ex=data.result;
            this.done = true;
        });
        
    }
}
