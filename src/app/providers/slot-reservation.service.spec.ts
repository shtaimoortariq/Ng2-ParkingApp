import { TestBed, inject } from '@angular/core/testing';

import { SlotReservationService } from './slot-reservation.service';

describe('SlotReservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlotReservationService]
    });
  });

  it('should be created', inject([SlotReservationService], (service: SlotReservationService) => {
    expect(service).toBeTruthy();
  }));
});
