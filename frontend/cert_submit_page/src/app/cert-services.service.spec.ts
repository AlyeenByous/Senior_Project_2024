import { TestBed } from '@angular/core/testing';

import { CertServicesService } from './cert-services.service';

describe('CertServicesService', () => {
  let service: CertServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
