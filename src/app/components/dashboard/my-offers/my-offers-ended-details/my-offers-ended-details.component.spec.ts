import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOffersEndedDetailsComponent } from './my-offers-ended-details.component';

describe('MyOffersEndedDetailsComponent', () => {
  let component: MyOffersEndedDetailsComponent;
  let fixture: ComponentFixture<MyOffersEndedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOffersEndedDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOffersEndedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
