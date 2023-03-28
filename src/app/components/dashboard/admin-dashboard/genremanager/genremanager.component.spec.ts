import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenremanagerComponent } from './genremanager.component';

describe('GenremanagerComponent', () => {
  let component: GenremanagerComponent;
  let fixture: ComponentFixture<GenremanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenremanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenremanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
