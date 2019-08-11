import { TestBed } from '@angular/core/testing';

import { VisibilidadService } from './visibilidad.service';

describe('VisibilidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisibilidadService = TestBed.get(VisibilidadService);
    expect(service).toBeTruthy();
  });
});
