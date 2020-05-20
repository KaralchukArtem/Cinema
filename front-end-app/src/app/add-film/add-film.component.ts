import { Component, OnInit } from '@angular/core';
import { Timetable } from 'src/models/cinema/timetable';
import { HttpService } from 'src/services/http.service';


@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.less'],
  providers: [HttpService]
})
export class AddFilmComponent implements OnInit {

  public modelTimetable = new Timetable();
  public ex:Timetable;
  constructor(private httpService:HttpService) { }

  ngOnInit(): void { }

  submit(){
    this.modelTimetable.hall.busy = "0";
    this.modelTimetable.hall.vacancy = this.modelTimetable.hall.amount;
    this.modelTimetable.film.IMDb = 0;
    this.httpService.postAdd(this.modelTimetable).subscribe((data:any) => {
      this.ex=data.result;
  });;
    console.log(this.modelTimetable);
  }

}
