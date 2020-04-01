import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCinemaComponent } from './view-cinema.component';

describe('ViewCinemaComponent', () => {
  let component: ViewCinemaComponent;
  let fixture: ComponentFixture<ViewCinemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCinemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
