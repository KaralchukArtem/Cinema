import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { CinemaModel } from 'src/models/cinema';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.less']
})
export class BuyTicketComponent implements OnInit {

  public model: CinemaModel;
  public time: any;
  public busy_input:any;
  public amount:any;
  public vacancy:any;
  public done:boolean = false;
  public price_of_ticket = 0;

  constructor(private activateRoute: ActivatedRoute, private httpService: HttpService){
      this.time = activateRoute.snapshot.params['time'];
  }

   ngOnInit(): void{
      this.httpService.getCinema().subscribe((data:any) => {
        this.model= data.result[0];
        console.log(this.model.timetable);
    });
  }

  submit(){
    this.done = true;
    var busy: String;
    var cinema = this.model.nameCinema;
    var film: any;
    var date: any;
    var hall: any;
    this.price_of_ticket = 5;

    this.model.timetable.forEach(element => {
      if(this.time == element.time){

        this.amount = element.hall.amount;
        film = element.film.name;
        date = element.date;
        hall = element.hall.nameHall;
        busy = element.hall.busy.toString();

        if(this.busy_input>0){
          this.price_of_ticket *=this.busy_input;
        }

        this.busy_input += +busy;
        this.vacancy = this.amount - this.busy_input;
      }else{
        console.log(error);
      }
    });
    console.log(this.busy_input + " busy " + this.amount +" amount "+ this.vacancy+ " vacancy ");

    this.httpService.getBuyTicket(
      this.amount,
      this.vacancy,
      this.busy_input,
      cinema,
      film,
      date,
      this.time,
      this.price_of_ticket,
      hall,
      this.busy_input
    ).subscribe((data:any) => {
      this.model=data.result;
      this.done = true;
    });
  }
}
