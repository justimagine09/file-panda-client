import { TestBed, async, inject } from '@angular/core/testing';

import { AuthPageGuardGuard } from './auth-page-guard.guard';

describe('AuthPageGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPageGuardGuard]
    });
  });

  it('should ...', inject([AuthPageGuardGuard], (guard: AuthPageGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
