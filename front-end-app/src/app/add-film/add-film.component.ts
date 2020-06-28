import { Component, OnInit } from '@angular/core';
import { Timetable } from 'src/models/cinema/timetable';
import { HttpService } from 'src/services/http.service';
import { CinemaModel } from 'src/models/cinema/cinema';
import { Router } from '@angular/router';
import { Film } from 'src/models/cinema/film';
import { createWriteStream } from 'fs';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.less'],
  providers: [HttpService]
})
export class AddFilmComponent implements OnInit {

  public selectedValueHall:String;
  public selectedValueFilm:string;

  //... Берем с сервера
  public modelCinema = new CinemaModel();
  //... Модель для отправки на сервер
  public modelTimetable = new Timetable();
  //... Модель для отправки в modelTimetable
  public modelFilm = new Film();

  public ex:Timetable;

  //... проверка по времени
  public triggerContinuation: boolean[];
  //... нужна чтобы смотреть даты и если по имени нашла а по дате нет, добавлять новый фильм
  public triggerExit: boolean[];
  //... ищем имя
  public triggerFilmname:boolean[];

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
  this.triggerFilmname = [];
  let triggerNumber:number = 0;

  let Start = this.modelTimetable.dateStart.split('-');
  let dateStart = new Date(+Start[0], +Start[1], +Start[2]);
  let End = this.modelTimetable.dateEnd.split('-');
  let dateEnd = new Date(+End[0], +End[1], +End[2]);
  let Today = this.modelFilm.date.split('-');
  let dateToday = new Date(+Today[0], +Today[1], +Today[2]);


  if(
    dateToday < dateEnd &&
    dateToday > dateStart &&
    dateEnd > dateStart
  ){
    this.modelCinema.hall.forEach(element => {
      if(element.nameHall == this.selectedValueHall){
        this.modelFilm.hall = element;
        this.modelFilm.IMDb = 0;
      }
    });
    if(this.modelCinema.timetable.length == 0){
      alert("Фильм успешно добавлени");
  
      this.modelTimetable.film.push(this.modelFilm)
      this.httpService.postAddTimetable(this.modelTimetable).subscribe((data:any) => {
        this.ex=data.result;
      });;
      this.modelTimetable = null;
      this.router.navigate(['/view-cinema']);
    }else{
      this.modelCinema.timetable.forEach(element => {
  
            element.film.forEach(elementFilm => {
              if(elementFilm.name == this.modelFilm.name){
                this.triggerFilmname.push(false);
                let dateClient = this.modelFilm.date.split('-');
                let dateInputClient = new Date(+dateClient[0], +dateClient[1], +dateClient[2]);
          
                let dateServer = elementFilm.date.split('-');
                let dateServerTable = new Date(+dateServer[0],+dateServer[1],+dateServer[2])
                
                  if(dateInputClient.getDate() == dateServerTable.getDate()){
                    this.triggerExit.push(false);
                    console.log(this.triggerExit);
                    //...create function (element,modelTimetable)
                    let timeServerTable = elementFilm.time.split(':');
                    let timeInputClient = this.modelFilm.time.split(':');
              
                    dateInputClient = new Date(dateInputClient.getFullYear(),dateInputClient.getMonth(),dateInputClient.getDate(),+timeInputClient[0],+timeInputClient[1]);
                    dateServerTable = new Date(dateServerTable.getFullYear(),dateServerTable.getMonth(),dateServerTable.getDate(),+timeServerTable[0],+timeServerTable[1]);
              
                    let dateServerTableClose = new Date();
                    let dateInputClientClose = new Date();
              
                    dateServerTableClose.setFullYear(dateServerTable.getFullYear(),dateServerTable.getMonth(),dateServerTable.getDate());
                    dateServerTableClose.setTime(dateServerTable.getTime());
                    dateServerTableClose.setMinutes(dateServerTableClose.getMinutes() + +elementFilm.long);
              
                    dateInputClientClose.setFullYear(dateInputClient.getFullYear(),dateInputClient.getMonth(),dateInputClient.getDate());
                    dateInputClientClose.setTime(dateInputClient.getTime());
                    dateInputClientClose.setMinutes(dateInputClientClose.getMinutes() + +this.modelFilm.long);

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
                  }
              }else{
                //...добавляем если не нашли
                this.triggerFilmname.push(true);
              }
            });
        });
    }
  }else{
    alert("Не вверные данные даты");
    this.modelFilm.date = null;
    this.modelTimetable.dateStart = null;
    this.modelTimetable.dateEnd = null;
  }


   for (let i = 0; i < this.triggerFilmname.length; i++) {
    if(this.triggerFilmname[i] == true){
      triggerNumber++; console.log(triggerNumber)
    }
    if(triggerNumber == this.triggerFilmname.length){
      alert("Фильм успешно добавлен");
      
      this.modelTimetable.film.push(this.modelFilm)

      this.httpService.postAddTimetable(this.modelTimetable).subscribe((data:any) => {
        this.ex=data.result;
      });;
      this.modelTimetable = null;

      this.router.navigate(['/view-cinema']);
    }
  }

  triggerNumber = 0;

  for (let i = 0; i < this.triggerExit.length; i++) {
    if(this.triggerExit[i] == true){
      triggerNumber++; console.log(triggerNumber)
    }
    if(triggerNumber == this.triggerExit.length){
      alert("Фильм успешно добавлен");
      this.httpService.postAddFilm(this.modelFilm).subscribe((data:any) => {
        this.ex=data.result;
      });;
      this.modelTimetable = null;
      this.router.navigate(['/view-cinema']);
    }
  }

  triggerNumber = 0;

  //...create function (triggerContinuation) "he is a [] in this submit()"
  for (let i = 0; i < this.triggerContinuation.length; i++) {
    if(this.triggerContinuation[i] == true){
      triggerNumber++; 
    }
    if(triggerNumber == this.triggerContinuation.length){
      alert("Фильм успешно добавлен");
      this.httpService.postAddFilm(this.modelFilm).subscribe((data:any) => {
        this.ex=data.result;
      });;
      this.modelTimetable = null;
      this.router.navigate(['/view-cinema']);
    }
  }

  if(triggerNumber != this.triggerContinuation.length){
    alert("Фильм нельзя добавить");
    this.modelTimetable = null;
  }

  console.log(this.modelTimetable);
  }

  searchFilm(){
    // this.modelCinema.timetable.forEach(element => {
    //   element.film.forEach(element => {
    //     switch(element.name){
    //       case 1:{
    //         break;
    //       }
    //     }
    //   });
    // });
    // console.log(this.modelCinema);
  }
}
