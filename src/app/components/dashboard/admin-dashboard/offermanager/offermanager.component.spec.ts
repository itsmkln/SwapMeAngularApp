import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffermanagerComponent } from './offermanager.component';

describe('OffermanagerComponent', () => {
  let component: OffermanagerComponent;
  let fixture: ComponentFixture<OffermanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffermanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffermanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
