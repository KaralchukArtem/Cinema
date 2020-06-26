import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { BuyTicketsService } from 'src/services/buytickets.service';
import { Timetable } from 'src/models/cinema/timetable';
import { Tickets } from 'src/models/cinema/tickets';
import { CinemaModel } from 'src/models/cinema/cinema';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.less'],
  providers: [HttpService]
})
export class BuyTicketComponent implements OnInit {

//переделать кусок говна, нету модели

  public modelCinema = new CinemaModel();
  public tickets = new Tickets();
  public dateFilm: Date;
  public busy_input: any;
  public done:boolean = false;
  public price_of_ticket = 5;
 
  constructor(private activateRoute: ActivatedRoute, private httpService: HttpService, private buytickets: BuyTicketsService,private router: Router){
    this.modelCinema = buytickets.timetable;
    this.dateFilm = buytickets.dateFilm;
  }

  ngOnInit(): void{ 
    
  }

  submit(){
    console.log(this.timetable);
        if(this.busy_input>0){
          this.tickets.cost = this.price_of_ticket * this.busy_input;
          this.timetable.film.hall.busy = (+this.timetable.film.hall.busy + this.busy_input).toString(); 
          this.timetable.film.hall.vacancy = (+this.timetable.film.hall.amount - +this.timetable.film.hall.busy).toString();
          let date = new Date(this.dateFilm.getFullYear(),this.dateFilm.getMonth(),this.dateFilm.getDate());
          if(+this.timetable.film.hall.vacancy >= 0){
            this.done = true; 
            //..говно переделать не красиво  
            this.tickets.timefilm = this.timetable.film.time;
            this.tickets.number_of_tickets = this.busy_input;
            this.tickets.hallname = this.timetable.film.hall.nameHall;
            this.tickets.filmname = this.timetable.film.name;
            this.tickets.datefilm = `${this.dateFilm.getFullYear()}-${this.dateFilm.getMonth()}-${this.dateFilm.getDate()}`;
            console.log(this.timetable.film.hall.amount + " timetable amount")
            console.log(this.timetable.film.hall.busy + " timetable busy")
            console.log(this.timetable.film.hall.vacancy + " timetable vacancy")
            console.log(this.tickets.datefilm + " date");
            this.httpService.postUpdateHall(this.timetable).subscribe((date:any)=>{
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
        }
      }
}
