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
  public time: String;
  public busy:any;
  public pop:Number = new Number(2);
  public done:boolean = false;


  public price = 0;

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
    var amount:any;
    var busy_s:any;
    this.price = 5

    this.model.timetable.forEach(element => {
      if(this.time == element.time){
        amount = element.hall.amount;
        busy_s = element.hall.busy;
        if(this.busy>0){
          this.price *=this.busy;
        }
        busy_s += this.busy;
        element.hall.vacancy = amount - busy_s;
        console.log(element.hall.busy + " busy " + element.hall.amount +" amount "+ element.hall.vacancy+ " vacancy ");
      }else{
        console.log(error);
      }
    });
  }
}
