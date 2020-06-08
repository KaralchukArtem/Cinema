import { Component, OnInit } from '@angular/core';
import { Timetable } from 'src/models/cinema/timetable';
import { HttpService } from 'src/services/http.service';
import { CinemaModel } from 'src/models/cinema/cinema';
import { Router } from '@angular/router';

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
  public triggerContinuation: boolean[];
  public triggerExit: boolean[];
  public exit:number = 0;

  constructor(private httpService:HttpService,private router:Router) {
      this.httpService.getCinema().subscribe((data:any) => {
        this.modelCinema = data.result[0];
        console.log(this.modelCinema);
    });
  }

  ngOnInit(): void { }

  submit(){
  this.triggerContinuation = [];
  this.triggerExit = [];
  let triggerNumber:number = 0;
  let defaultSwithcase:number = 0;

  this.modelCinema.hall.forEach(element => {
    if(element.nameHall == this.selectedValue){
      this.modelTimetable.hall = element;
      this.modelTimetable.film.IMDb = 0;
    }
  });

  if(this.modelCinema.timetable.length == 0){
    alert("Фильм успешно добавлени");
    this.httpService.postAdd(this.modelTimetable).subscribe((data:any) => {
      this.ex=data.result;
    });;
    this.router.navigate(['view-cinema']);
  }else{
    this.modelCinema.timetable.forEach(element => {
    
      let dateClient = this.modelTimetable.date.split('-');
      let dateInputClient = new Date(+dateClient[0], +dateClient[1], +dateClient[2]);
 
      let dateServer = element.date.split('-');
      let dateServerTable = new Date(+dateServer[0],+dateServer[1],+dateServer[2])
      console.log(this.modelCinema.timetable.length + "fff");
      switch (element.hall.nameHall) {
       case this.selectedValue:{
         if(dateInputClient.getDate() == dateServerTable.getDate()){
           this.triggerExit.push(false);
           console.log(this.triggerExit);
           //...create function (element,modelTimetable)
           let timeServerTable = element.time.split(':');
           let timeInputClient = this.modelTimetable.time.split(':');
     
           dateInputClient = new Date(dateInputClient.getFullYear(),dateInputClient.getMonth(),dateInputClient.getDate(),+timeInputClient[0],+timeInputClient[1]);
           dateServerTable = new Date(dateServerTable.getFullYear(),dateServerTable.getMonth(),dateServerTable.getDate(),+timeServerTable[0],+timeServerTable[1]);
     
           let dateServerTableClose = new Date();
           let dateInputClientClose = new Date();
     
           dateServerTableClose.setFullYear(dateServerTable.getFullYear(),dateServerTable.getMonth(),dateServerTable.getDate());
           dateServerTableClose.setTime(dateServerTable.getTime());
           dateServerTableClose.setMinutes(dateServerTableClose.getMinutes() + +element.film.long);
     
           dateInputClientClose.setFullYear(dateInputClient.getFullYear(),dateInputClient.getMonth(),dateInputClient.getDate());
           dateInputClientClose.setTime(dateInputClient.getTime());
           dateInputClientClose.setMinutes(dateInputClientClose.getMinutes() + +this.modelTimetable.film.long);
 
           if((
               dateServerTable.getTime() <= dateInputClient.getTime() &&
               dateServerTableClose.getTime() <= dateInputClient.getTime()
               )||(
               dateServerTable.getTime() >= dateInputClientClose.getTime() &&
               dateServerTableClose.getTime() >= dateInputClientClose.getTime()
             )){this.triggerContinuation.push(true);} else {this.triggerContinuation.push(false);}
         }else{
           this.triggerExit.push(true);
           console.log(this.triggerExit);
         }break;
       }
       default:{
        defaultSwithcase++;
        if(defaultSwithcase == this.modelCinema.timetable.length){
          console.log(`def - ${defaultSwithcase}, model - ${this.modelCinema.timetable.length}`);
          alert("Фильм успешно добавлен");
          this.httpService.postAdd(this.modelTimetable).subscribe((data:any) => {
            this.ex=data.result;
          });;
          this.router.navigate(['view-cinema']);
        }break;
       }
     }
   });
  }

  for (let i = 0; i < this.triggerExit.length; i++) {
    if(this.triggerExit[i] == true){
      triggerNumber++; console.log(triggerNumber)
    }
    if(triggerNumber == this.triggerExit.length){
      alert("Фильм успешно добавлен");
      this.httpService.postAdd(this.modelTimetable).subscribe((data:any) => {
        this.ex=data.result;
      });;
      this.router.navigate(['view-cinema']);
    }
  }

  triggerNumber = 0;

  //...create function (triggerContinuation) "he is a [] in this submit()"
  for (let i = 0; i < this.triggerContinuation.length; i++) {
    if(this.triggerContinuation[i] == true){
      triggerNumber++; 
      console.log(triggerNumber)
      console.log(this.triggerContinuation.length);
    }
    if(triggerNumber == this.triggerContinuation.length){
      alert("Фильм успешно добавлен");
      this.httpService.postAdd(this.modelTimetable).subscribe((data:any) => {
        this.ex=data.result;
      });;
      this.router.navigate(['view-cinema']);
    }
  }

  if(triggerNumber != this.triggerContinuation.length){
    alert("Фильм нельзя добавить");
  }

  console.log(this.modelTimetable);
  }

}
