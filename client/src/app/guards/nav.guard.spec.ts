import { TestBed, async, inject } from '@angular/core/testing';

import { NavGuard } from './nav.guard';

describe('NavGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavGuard]
    });
  });

  it('should ...', inject([NavGuard], (guard: NavGuard) => {
    expect(guard).toBeTruthy();
  }));
});
