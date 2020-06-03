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
  this.modelCinema.timetable.forEach(element => {
    
     let dateInputClient = this.modelTimetable.date.split('-');
     let date = new Date(+dateInputClient[0], +dateInputClient[1], +dateInputClient[2]);

     let dateTimetable = element.date.split('-');
     let date2 = new Date(+dateTimetable[0],+dateTimetable[1],+dateTimetable[2])
     
    if(date.getDate() == date2.getDate() && element.hall.nameHall == this.selectedValue){
      let timeTimetable = element.time.split(':');
      let timeInputClient = this.modelTimetable.time.split(':');

      date = new Date(date.getFullYear(),date.getMonth(),date.getDate(),+timeInputClient[0],+timeInputClient[1]);
      console.log(date + " date");
      date2 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate(),+timeTimetable[0],+timeTimetable[1]);
      //...5 minute for a exit cinema
      date2.setMinutes(date2.getMinutes() + +element.film.long + 5);
      console.log(date2 + " date2");

      console.log(date.getTime() + " time");
      console.log(date2.getTime() + " time2");
      
      if(
        date.getTime() > date2.getTime() &&
        date.getTime() < date2.getTime()) console.log(true);
      else console.log(false);
    }
  });
  // this.httpService.postAdd(this.modelTimetable).subscribe((data:any) => {
  //   this.ex=data.result;
  // });;
  console.log(this.modelTimetable);
  }

}
