/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthorizeService } from './authorize.service';

describe('Service: Authorize', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizeService]
    });
  });

  it('should ...', inject([AuthorizeService], (service: AuthorizeService) => {
    expect(service).toBeTruthy();
  }));
});
