import { TestBed } from '@angular/core/testing';

import { WindowModeBlockScrollService } from './window-mode-block-scroll.service';

describe('WindowModeBlockScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowModeBlockScrollService = TestBed.get(WindowModeBlockScrollService);
    expect(service).toBeTruthy();
  });
});
