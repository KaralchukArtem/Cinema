import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { AccountModel } from 'src/models/account/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public flag:boolean = false;
  public account = new AccountModel();
  public menu:String;

  constructor(private accountService:AuthenticationService,
    private route: Router){
    this.account = this.accountService.account;
    if(this.account) this.menu="Меню";
    else this.menu = "Регистрация";
  }

  ngOnInit(): void {}

  loginSubmit(){
    this.route.navigate(['/login']);
  }


  menuSubmit(){
    if(!this.account)
    this.route.navigate(['/registration']);
    if(this.account.lower_admin_rights.flag == true)
    this.route.navigate(['/admin']);
    else this.route.navigate(['/user']);
    
  }

}
