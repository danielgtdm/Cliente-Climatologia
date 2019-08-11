import { TestBed } from '@angular/core/testing';

import { GeotermometroService } from './geotermometro.service';

describe('GeotermometroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeotermometroService = TestBed.get(GeotermometroService);
    expect(service).toBeTruthy();
  });
});
