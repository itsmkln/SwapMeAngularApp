import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamemanagerComponent } from './gamemanager.component';

describe('GamemanagerComponent', () => {
  let component: GamemanagerComponent;
  let fixture: ComponentFixture<GamemanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamemanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
