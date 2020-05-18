import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { AccountModel } from 'src/models/account/account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public flag:boolean = false;
  public account:AccountModel;

  constructor(private accountService:AuthenticationService){
    this.account = this.accountService.account;
  }

  ngOnInit(): void {
    this.flag = (this.account)?true:false;
    this.accountService.flag = this.flag;
    console.log(this.accountService.flag + "accountService");
    console.log(this.flag + " header");
  }

}
