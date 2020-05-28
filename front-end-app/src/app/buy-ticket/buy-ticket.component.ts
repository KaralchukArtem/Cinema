import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { CinemaModel } from 'src/models//cinema/cinema';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.less']
})
export class BuyTicketComponent implements OnInit {

//переделать кусок говна, нету модели

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
    var nameCinema = this.model.nameCinema;
    let film: any;
    var date: any;
    var nameHall: any;
    this.price_of_ticket = 5;

    this.model.timetable.forEach(element => {
      if(this.time == element.time){

        this.amount = element.hall.amount;
        film = element.film.name;
        date = element.date;
        nameHall = element.hall.nameHall;
        busy = element.hall.busy;

        if(this.busy_input>0){
          this.price_of_ticket *=this.busy_input;
        }

        busy = this.busy_input + +busy;
        this.vacancy = this.amount - (+busy);
      }else{
        console.log(error);
      }
    });
    console.log(busy + " busy " + this.busy_input +" busy_input "+ this.amount +" amount "+ this.vacancy+ " vacancy ");

    this.httpService.getBuyTicket(
      this.amount,
      this.vacancy,
      busy,
      nameCinema,
      film,
      date,
      this.time,
      this.price_of_ticket,
      nameHall,
      this.busy_input
    ).subscribe((data:any) => {
      this.model=data.result;
      this.done = true;
    });
  }
}
