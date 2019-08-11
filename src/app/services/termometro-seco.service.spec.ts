import { TestBed } from '@angular/core/testing';

import { TermometroSecoService } from './termometro-seco.service';

describe('TermometroSecoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TermometroSecoService = TestBed.get(TermometroSecoService);
    expect(service).toBeTruthy();
  });
});
