import { TestBed } from '@angular/core/testing';

import { ComunasService } from './comunas.service';

describe('Comunas', () => {
  let service: ComunasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
