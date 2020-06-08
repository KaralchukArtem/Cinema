import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {AuthenticationService} from 'src/services/authentication.service';
import {CinemaModel} from '../../models/cinema/cinema'
import { Timetable } from 'src/models/cinema/timetable';
import { BuyTicketsService } from 'src/services/buytickets.service';
import { Router } from '@angular/router';

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
  public films:Timetable[] = [];
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
    for (let i = 0; i < this.model.timetable.length; i++) {
      let strDate = this.model.timetable[i].date.toString().split('-')
      let date2 = new Date(`${strDate[0]}-${strDate[1]}-${strDate[2]}`)
      let today = new Date(date)
      let beforeAdd = new Date(date2);
      date2.setDate(date2.getDate() + 14)
      if (
        today <= date2 &&
        today >= beforeAdd
      ) {
        this.films.push(this.model.timetable[i])
      }
    }
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

  buyTickets(timetable:Timetable){
    this.buytickets.searchFilm(timetable,this.buyTicketsDate);
    this.router.navigate(['/buy-ticket']);
  }

}