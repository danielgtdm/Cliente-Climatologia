import { TestBed } from '@angular/core/testing';

import { TemperaturaService } from './temperatura.service';

describe('TemperaturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemperaturaService = TestBed.get(TemperaturaService);
    expect(service).toBeTruthy();
  });
});
