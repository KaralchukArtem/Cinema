import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/models/account/account';
import { CinemaModel } from 'src/models/cinema/cinema';
import { HttpService } from 'src/services/http.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { Period } from 'src/models/Period';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})

export class AdminComponent implements OnInit {

  public account = new AccountModel();
  public cinema = new CinemaModel();

  public firstDate:String;
  public secondDate:String;

  public tickets:Number;
  public sumTickets:Number;
  public film:String;

  public flagStatistical:boolean = false;

  constructor(private httpService:HttpService,private route:Router,
    private accountService:AuthenticationService) {
    this.account = accountService.account;
  }

  ngOnInit(): void {
    this.httpService.getCinema().subscribe((data:any) => {
      this.cinema= data.result[0];
      console.log(this.cinema.timetable);
  });
  }

  Statistical(){
    this.flagStatistical = true;
  }

  Filter(){
    let first =  this.firstDate.split('-');
    let second = this.secondDate.split("-");

    let day1 = new Date( +first[0], +first[1], +first[2]);
    let day2 = new Date( +second[0], +second[1], +second[2]);
    let day3 = (+day2- +day1)/(60*60*24*1000);
    
    console.log(first[2] + " firstdate " + this.secondDate+ " se");
    console.log(day1 + " firstdate " + day2+ " se");

    console.log(day3+ " day3");
    console.log(this.film);
  }
}
