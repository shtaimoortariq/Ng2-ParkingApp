import { TestBed, async, inject } from '@angular/core/testing';

import { AdminAuthGuardGuard } from './admin-auth-guard.guard';

describe('AdminAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGuardGuard]
    });
  });

  it('should ...', inject([AdminAuthGuardGuard], (guard: AdminAuthGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
