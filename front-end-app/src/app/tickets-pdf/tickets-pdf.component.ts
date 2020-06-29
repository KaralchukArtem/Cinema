import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BuyTicketsService } from 'src/services/buytickets.service';
import { Tickets } from 'src/models/cinema/tickets';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-tickets-pdf',
  templateUrl: './tickets-pdf.component.html',
  styleUrls: ['./tickets-pdf.component.less'],
})
export class TicketsPdfComponent implements OnInit{

  public tickets = new Array<Tickets>();
  public filmname:string;

  @ViewChild('content') content:ElementRef;

  constructor(private buytickets:BuyTicketsService) {
    
      console.log(typeof(this.tickets.datefilm),typeof(this.tickets.filmname), typeof(this.tickets.hallname))
   }

  ngOnInit(){
    this.tickets = this.buytickets.tickets;
  }

  public downloadPDF():void{
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML,15,15,{
      'wight':190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('test.pdf');
  }

}
