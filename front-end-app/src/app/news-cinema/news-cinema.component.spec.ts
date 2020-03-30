import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCinemaComponent } from './news-cinema.component';

describe('NewsCinemaComponent', () => {
  let component: NewsCinemaComponent;
  let fixture: ComponentFixture<NewsCinemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCinemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCinemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
