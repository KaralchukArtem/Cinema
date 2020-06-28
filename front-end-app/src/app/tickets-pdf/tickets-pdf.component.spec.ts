import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsPdfComponent } from './tickets-pdf.component';

describe('TicketsPdfComponent', () => {
  let component: TicketsPdfComponent;
  let fixture: ComponentFixture<TicketsPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
