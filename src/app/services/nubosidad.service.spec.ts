import { TestBed } from '@angular/core/testing';

import { NubosidadService } from './nubosidad.service';

describe('NubosidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NubosidadService = TestBed.get(NubosidadService);
    expect(service).toBeTruthy();
  });
});
