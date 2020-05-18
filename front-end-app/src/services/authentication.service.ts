import { Injectable } from '@angular/core';
import { AccountModel } from 'src/models/account/account';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public account:AccountModel;
  public flag:boolean;
  
  constructor() { }

  pullAccount(agr:AccountModel, agr1:boolean){
    this.account = agr[0];
    this.flag = agr1;
    console.log("AuthenticationService ", this.account.nickname," " + this.flag);
  }

}
