import { Component, OnInit } from '@angular/core';
import { Timetable } from 'src/models/cinema/timetable';
import { HttpService } from 'src/services/http.service';
import { CinemaModel } from 'src/models/cinema/cinema';
import { Hall } from 'src/models/cinema/hall';


@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.less'],
  providers: [HttpService]
})
export class AddFilmComponent implements OnInit {

  public selectedValue:String;
  public modelCinema = new CinemaModel();
  public modelTimetable = new Timetable();
  public ex:Timetable;
  constructor(private httpService:HttpService) {
    this.httpService.getCinema().subscribe((data:any) => {
      this.modelCinema = data.result[0];
      console.log(this.modelCinema);
  });
  }

  ngOnInit(): void { }

  submit(){
  this.modelCinema.hall.forEach(element => {
    if(element.nameHall == this.selectedValue){
      this.modelTimetable.hall = element;
      this.modelTimetable.film.IMDb = 0;
    }
  });
  this.httpService.postAdd(this.modelTimetable).subscribe((data:any) => {
    this.ex=data.result;
  });;
  console.log(this.modelTimetable);
  }

}
