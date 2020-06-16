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

  public tickets = new Tickets();
  public filmname:string;

  @ViewChild('content') content:ElementRef;

  constructor(private buytickets:BuyTicketsService) {
      this.tickets = buytickets.tickets;
      console.log(typeof(this.tickets.datefilm),typeof(this.tickets.filmname), typeof(this.tickets.hallname))
   }

  ngOnInit(){
    
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
