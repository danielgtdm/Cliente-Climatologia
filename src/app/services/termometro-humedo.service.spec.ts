import { TestBed } from '@angular/core/testing';

import { TermometroHumedoService } from './termometro-humedo.service';

describe('TermometroHumedoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TermometroHumedoService = TestBed.get(TermometroHumedoService);
    expect(service).toBeTruthy();
  });
});
