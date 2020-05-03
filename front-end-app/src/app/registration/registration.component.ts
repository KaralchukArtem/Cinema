import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { CinemaModel } from 'src/models/cinema/cinema';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  public model: CinemaModel;

  public nickname:String;
  public email:String;
  public password:String;
  public key:String;
  public flag:boolean = false;

  constructor(private activateRoute: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getCinema().subscribe((data:any) => {
      this.model= data.result[0];
  });
  }


  submit(){
    this.flag = (this.key == this.model.key)? true : false;
    this.httpService.getRegistration(
      this.nickname,this.email,this.password,this.flag,this.key
      ).subscribe((data:any) => {
        this.model=data.result;
      });
  }
}
