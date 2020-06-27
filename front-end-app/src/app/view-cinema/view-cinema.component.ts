import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {AuthenticationService} from 'src/services/authentication.service';
import {CinemaModel} from '../../models/cinema/cinema'
import { Timetable } from 'src/models/cinema/timetable';
import { BuyTicketsService } from 'src/services/buytickets.service';
import { Router } from '@angular/router';
import { Film } from 'src/models/cinema/film';

@Component({
  selector: 'app-view-cinema',
  templateUrl: './view-cinema.component.html',
  styleUrls: ['./view-cinema.component.less'],
  providers: [HttpService]
})
export class ViewCinemaComponent implements OnInit {

  public model = new CinemaModel();
  public flag: boolean = false;
  public daysRender = [];
  public films:Film[] = [];
  public current = new Date();
  public days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  public buyTicketsDate = new Date();
 
  onClickDayBtn(date) {
    this.current = date.getDate();
    this.buyTicketsDate = date;
    this.initFilms(date);
  }

  initFilms(date) {
    console.log(date);
    this.films = [];
    this.model.timetable.forEach(element => {
      element.film.forEach(elementFilm => {
        let strDateEnd = element.dateEnd.toString().split('-');
        let dateEnd = new Date(`${strDateEnd[0]}-${strDateEnd[1]}-${strDateEnd[2]}`)
        let today = new Date(date);
        let strDateStart = element.dateStart.toString().split('-');
        let dateStart = new Date(`${strDateStart[0]}-${strDateStart[1]}-${strDateStart[2]}`);
        if (
          today <= dateEnd &&
          today >= dateStart
        ) {
          this.films.push(elementFilm);
        }
      });
    });
  }

  constructor(
    private httpService: HttpService, 
    private accountService: AuthenticationService,
    private buytickets: BuyTicketsService,
    private router:Router
    ) {
    this.flag = this.accountService.flag;
    this.httpService.getCinema().subscribe((data: any) => {
      this.model = data.result[0];
      this.initFilms(new Date().getDate())
    });
  }

  ngOnInit() {
    for (let i = 0; i < 7; i++) {
      let weekDate = new Date();
      weekDate.setDate(weekDate.getDate()+i)
      this.daysRender.push({
        date: weekDate,
        day: this.days[weekDate.getDay()],
      })
    }
  }

  buyTickets(name: String, time:String){
    this.films.forEach(element => {
      if(element.name == name && element.time == time){
        // console.log(element);
        this.buytickets.searchFilm(element);
        this.buytickets.Date = this.buyTicketsDate;
        this.router.navigate(['/buy-ticket']);
      }
    });
    
  }

}