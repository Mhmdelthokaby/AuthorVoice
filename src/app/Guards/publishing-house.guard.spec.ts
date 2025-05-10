import { TestBed } from '@angular/core/testing';

import { PublishingHouseGuard } from './publishing-house.guard';

describe('PublishingHouseGuard', () => {
  let guard: PublishingHouseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PublishingHouseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
