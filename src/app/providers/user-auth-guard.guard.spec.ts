import { TestBed, async, inject } from '@angular/core/testing';

import { UserAuthGuardGuard } from './user-auth-guard.guard';

describe('UserAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthGuardGuard]
    });
  });

  it('should ...', inject([UserAuthGuardGuard], (guard: UserAuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
