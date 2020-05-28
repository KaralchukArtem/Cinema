import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { CinemaModel } from 'src/models/cinema/cinema';
import { AccountModel } from 'src/models/account/account';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
  providers:[HttpService]
})
export class RegistrationComponent implements OnInit {

  public model: CinemaModel;
  public account = new AccountModel();
  public ex:AccountModel;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getCinema().subscribe((data:any) => {
      this.model= data.result[0];
  });
  }


  submit(){
    this.account.lower_admin_rights.flag = (this.account.lower_admin_rights.key == this.model.key)? true : false;
    this.httpService.postRegistration(this.account).subscribe((data:any) => {
        this.ex=data.result;
      });
  }
}
