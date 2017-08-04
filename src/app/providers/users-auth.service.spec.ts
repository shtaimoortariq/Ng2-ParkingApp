import { TestBed, inject } from '@angular/core/testing';

import { UsersAuthService } from './users-auth.service';

describe('UsersAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersAuthService]
    });
  });

  it('should be created', inject([UsersAuthService], (service: UsersAuthService) => {
    expect(service).toBeTruthy();
  }));
});
