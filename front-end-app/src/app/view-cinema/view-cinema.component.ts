import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CinemaModel } from '../../models/cinema'

@Component({
  selector: 'app-view-cinema',
  templateUrl: './view-cinema.component.html',
  styleUrls: ['./view-cinema.component.less']
})
export class ViewCinemaComponent{

  public model: CinemaModel;
  public done: boolean = false;

  constructor(private httpService: HttpService) { }

  submit(){
    this.httpService.getCinema()
    .subscribe((data:any) => {
        this.model=data.result;
        this.done = true;
    });
}
}
