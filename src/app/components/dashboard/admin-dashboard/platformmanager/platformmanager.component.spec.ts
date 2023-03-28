import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformmanagerComponent } from './platformmanager.component';

describe('PlatformmanagerComponent', () => {
  let component: PlatformmanagerComponent;
  let fixture: ComponentFixture<PlatformmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformmanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
