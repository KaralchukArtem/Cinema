import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { BuyTicketsService } from 'src/services/buytickets.service';
import { Tickets } from 'src/models/cinema/tickets';
import { CinemaModel } from 'src/models/cinema/cinema';
import { Film } from 'src/models/cinema/film';

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
  public dateFilm: Date;
  public date:String;

  public done:boolean = false;
  public price_of_ticket = 5;
 
  constructor(private activateRoute: ActivatedRoute, private httpService: HttpService, private buytickets: BuyTicketsService,private router: Router){
    this.film = buytickets.film;
    this.dateFilm = buytickets.Date;
    this.date =`${this.dateFilm.getFullYear()} - ${this.dateFilm.getMonth() + 1} - ${this.dateFilm.getDate()}`;
    console.log(this.film);
  }

  ngOnInit(): void{ 
    
  }

  submit(){
    console.log(this.film);
    if(
      (this.place_input  <= 10 && this.place_input > 0) &&
      (this.row_input <= 5 && this.row_input > 0)){
        this.busy_input = 1;
        this.tickets.cost = this.price_of_ticket * this.busy_input;
        this.film.hall.busy = (+this.film.hall.busy + this.busy_input).toString(); 
        this.film.hall.vacancy = (+this.film.hall.amount - +this.film.hall.busy).toString();
        let date = new Date(this.dateFilm.getFullYear(),this.dateFilm.getMonth(),this.dateFilm.getDate());
        if(+this.film.hall.vacancy >= 0){
          this.done = true; 
          //..говно переделать не красиво  
          this.tickets.timefilm = this.film.time;
          this.tickets.number_of_tickets = this.busy_input;
          this.tickets.hallname = this.film.hall.nameHall;
          this.tickets.filmname = this.film.name;
          this.tickets.datefilm = `${this.dateFilm.getFullYear()}-${this.dateFilm.getMonth() +1}-${this.dateFilm.getDate()}`;
          console.log(this.film.hall.amount + " timetable amount")
          console.log(this.film.hall.busy + " timetable busy")
          console.log(this.film.hall.vacancy + " timetable vacancy")
          console.log(this.tickets.datefilm + " date");
          this.film.hall.row = this.row_input;
          this.film.hall.place = this.place_input;
          console.log(this.film)
          this.httpService.postUpdateHall(this.film).subscribe((date:any)=>{
            console.log(date);
          })
          this.httpService.postCreateTicket(this.tickets).subscribe((date:any)=>{
            console.log(date);
          })
          alert("Попука проведена успешна");
          this.buytickets.tickets = this.tickets;
          this.router.navigate(['/pdf']);
        }else{
          this.price_of_ticket = 0;
          alert("Превысили лимит свободных билетов")
        }
      }else{
        alert('Нету выбранного места, проверьте введеный вами ряд и место (место не больше 5, ряд не больше 10)')
      }

      }
}
