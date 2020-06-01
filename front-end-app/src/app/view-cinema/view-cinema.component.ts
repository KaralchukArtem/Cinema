import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {AuthenticationService} from 'src/services/authentication.service';
import {CinemaModel} from '../../models/cinema/cinema'

@Component({
  selector: 'app-view-cinema',
  templateUrl: './view-cinema.component.html',
  styleUrls: ['./view-cinema.component.less'],
  providers: [HttpService]
})
export class ViewCinemaComponent implements OnInit {

  public model = new CinemaModel();
  flag: boolean = false;
  daysRender = [];
  films = [];
  current = new Date().getDate();
  days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  onClickDayBtn(date) {
    this.initFilms(date);
    this.current = date;
  }

  initFilms(date) {
    this.films = [];
    for (let i = 0; i < this.model.timetable.length; i++) {
      let strDate = this.model.timetable[i].date.toString().split('.')
      let date2 = new Date(`${strDate[2]}-${strDate[1]}-${strDate[0]}`)
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

  constructor(private httpService: HttpService, private accountService: AuthenticationService) {
    this.flag = this.accountService.flag;
    this.httpService.getCinema().subscribe((data: any) => {
      this.model = data.result[0];
      this.initFilms(new Date().getDate())
    });
  }

  ngOnInit() {
    let today = new Date().getDate()
    for (let i = 0; i < 7; i++) {
      let weekDate = new Date();
      weekDate.setDate(today+i)
      let weekDay = weekDate.getDay()
      this.daysRender.push({
        date: weekDate,
        day: this.days[weekDay],
      })
    }
  }
}
