import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { CinemaModel } from '../../models/cinema/cinema'

@Component({
  selector: 'app-view-cinema',
  templateUrl: './view-cinema.component.html',
  styleUrls: ['./view-cinema.component.less'],
  providers:[HttpService]
})
export class ViewCinemaComponent implements OnInit{

  public model = new CinemaModel();
  flag:boolean = false;

  constructor(private httpService: HttpService,private accountService:AuthenticationService) {}

  ngOnInit(){
    this.flag = this.accountService.flag;
    console.log(this.flag);
    this.httpService.getCinema().subscribe((data:any) => {
      this.model= data.result[0];
      console.log(this.model.timetable);
  });
  }
}
