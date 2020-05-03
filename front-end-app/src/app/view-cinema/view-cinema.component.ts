import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CinemaModel } from '../../models/cinema/cinema'

@Component({
  selector: 'app-view-cinema',
  templateUrl: './view-cinema.component.html',
  styleUrls: ['./view-cinema.component.less']
})
export class ViewCinemaComponent implements OnInit{

  public model: CinemaModel
  
  done: boolean = false

  constructor(private httpService: HttpService) { }

  ngOnInit(){
    this.httpService.getCinema().subscribe((data:any) => {
      this.model= data.result[0];
      this.done = true;
      console.log(this.model.timetable);
  });
  }
}
