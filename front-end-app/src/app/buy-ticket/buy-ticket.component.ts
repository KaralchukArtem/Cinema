import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from 'src/services/http.service';
import {BuyTicketsService} from 'src/services/buytickets.service';
import {Seat, Tickets} from 'src/models/cinema/tickets';
import {Film} from 'src/models/cinema/film';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.less'],
  providers: [HttpService]
})
export class BuyTicketComponent implements OnInit {

//переделать кусок говна, нету модели

  public film = new Film();
  public tickets = new Tickets();

  public busy_input: any;
  public row_input: any;
  public place_input: any;
  public String = String;
  public dateFilm: Date;
  public date: String;
  public siteMap: any;
  public done: boolean = false;
  public price_of_ticket = 5;

  public allTickets = Array<Tickets>();// тут находятся тикеты из БД
  //вот это
  public seatsUser = Array<Seat>();
//надо вот так запихнуть:  тикет_пользователя.seats = seatsUser

  constructor(private activateRoute: ActivatedRoute, private httpService: HttpService, private buytickets: BuyTicketsService, private router: Router) {
    this.film = buytickets.film;
    this.dateFilm = buytickets.Date;
    this.date = `${this.dateFilm.getFullYear()} - ${this.dateFilm.getMonth() + 1} - ${this.dateFilm.getDate()}`;
    console.log(this.film);
  }

  setSeat(i, j) {
    if (!this.siteMap[i][j]) {
      this.seatsUser.push(new Seat(i, j))
    }

    for (let k = 0; k < this.seatsUser.length; k++) {
      if (this.seatsUser[k].row == i && this.seatsUser[k].cell == j) {
        if (this.siteMap[i][j]) {
          this.seatsUser.splice(k, 1);
          this.siteMap[i][j] = false;
        }
      }
    }


    for (let it of this.seatsUser) {
      this.siteMap[it.row][it.cell] = true
    }
  }


  fillSeatMap(array: Array<Tickets>) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].seats.length; j++) {
        let seat = array[i].seats[j]
        this.siteMap[seat.row][seat.cell] = true;
      }
    }
  }

  ngOnInit(): void {
    // this.siteMap = new Array(5).fill(new Array(10).fill(false, 0, 10), 0, 5)
    this.siteMap = [];
    for (let i = 0; i < 5; i++) {
      this.siteMap.push([]);
    }

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        this.siteMap[i].push(false);
      }
    }

    let felted = this.allTickets.filter(k => k.filmname === this.buytickets.film.name && k.datefilm === this.buytickets.film.date);
    this.fillSeatMap(felted);

  }

  submit() {
    console.log(this.film);
    if (
      (this.place_input <= 10 && this.place_input > 0) &&
      (this.row_input <= 5 && this.row_input > 0)) {
      this.busy_input = 1;
      this.tickets.cost = this.price_of_ticket * this.busy_input;
      this.film.hall.busy = (+this.film.hall.busy + this.busy_input).toString();
      this.film.hall.vacancy = (+this.film.hall.amount - +this.film.hall.busy).toString();
      let date = new Date(this.dateFilm.getFullYear(), this.dateFilm.getMonth(), this.dateFilm.getDate());
      if (+this.film.hall.vacancy >= 0) {
        this.done = true;
        //..говно переделать не красиво
        this.tickets.timefilm = this.film.time;
        this.tickets.number_of_tickets = this.busy_input;
        this.tickets.hallname = this.film.hall.nameHall;
        this.tickets.filmname = this.film.name;
        this.tickets.datefilm = `${this.dateFilm.getFullYear()}-${this.dateFilm.getMonth() + 1}-${this.dateFilm.getDate()}`;
        console.log(this.film.hall.amount + " timetable amount")
        console.log(this.film.hall.busy + " timetable busy")
        console.log(this.film.hall.vacancy + " timetable vacancy")
        console.log(this.tickets.datefilm + " date");
        this.film.hall.row = this.row_input;
        this.film.hall.place = this.place_input;
        console.log(this.film)
        this.httpService.postUpdateHall(this.film).subscribe((date: any) => {
          console.log(date);
        })
        this.httpService.postCreateTicket(this.tickets).subscribe((date: any) => {
          console.log(date);
        })
        alert("Попука проведена успешна");
        this.buytickets.tickets = this.tickets;
        this.router.navigate(['/pdf']);
      } else {
        this.price_of_ticket = 0;
        alert("Превысили лимит свободных билетов")
      }
    } else {
      alert('Нету выбранного места, проверьте введеный вами ряд и место (место не больше 5, ряд не больше 10)')
    }

  }
}
