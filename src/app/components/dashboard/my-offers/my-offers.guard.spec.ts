import { TestBed } from '@angular/core/testing';

import { MyOffersGuard } from './my-offers.guard';

describe('MyOffersGuard', () => {
  let guard: MyOffersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyOffersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
