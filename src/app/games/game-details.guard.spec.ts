import { TestBed } from '@angular/core/testing';

import { GameDetailsGuard } from './game-details.guard';

describe('GameDetailsGuard', () => {
  let guard: GameDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
