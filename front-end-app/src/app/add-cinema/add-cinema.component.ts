import { Component, OnInit} from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.less'],
  providers: [HttpService]
})
export class AddCinemaComponent{

    num1: number;
    num2: number;
    sum: number;
    done: boolean = false;
    constructor(private httpService: HttpService){}

    submit(){
        this.httpService.getSum(this.num1, this.num2)
        .subscribe((data:any) => {
            this.sum=data.result; 
            this.done=true;
        });
    }
}
