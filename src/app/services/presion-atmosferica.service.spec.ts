import { TestBed } from '@angular/core/testing';

import { PresionAtmosfericaService } from './presion-atmosferica.service';

describe('PresionAtmosfericaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresionAtmosfericaService = TestBed.get(PresionAtmosfericaService);
    expect(service).toBeTruthy();
  });
});
