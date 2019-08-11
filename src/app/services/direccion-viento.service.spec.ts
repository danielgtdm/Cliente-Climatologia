import { TestBed } from '@angular/core/testing';

import { DireccionVientoService } from './direccion-viento.service';

describe('DireccionVientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DireccionVientoService = TestBed.get(DireccionVientoService);
    expect(service).toBeTruthy();
  });
});
