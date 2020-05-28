import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { AccountModel } from 'src/models/account/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public email:String;
  public password:String;
  public account:AccountModel;
  public flag:boolean;

  constructor(private httpService: HttpService,
    private aunthenticationService: AuthenticationService,
    private route: Router) { }

  ngOnInit(): void {}

  submit(){
    this.httpService.getLogin( this.email,this.password).subscribe((date:any)=>{
      this.account = date.result;
      if(this.account){
        this.flag = this.account[0].lower_admin_rights.flag;
        console.log(this.account);
        this.aunthenticationService.pullAccount(this.account,this.flag);
        this.route.navigate(['/view-cinema']);
      }else{
        this.flag = false
        alert("Не верный логин или пароль повторите попытку");
      }
      console.log(this.flag);
    })
  }
}
