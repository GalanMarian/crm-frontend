import { TestBed } from '@angular/core/testing';

import { VolunteerApiService } from './volunteer-api.service';

describe('VolunteerApiService', () => {
  let service: VolunteerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
