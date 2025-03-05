import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkGuard } from './guards/check.guard';

describe('checkGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
