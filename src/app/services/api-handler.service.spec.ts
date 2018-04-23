/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiHandlerService } from './api-handler.service';

describe('ApiHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiHandlerService]
    });
  });

  it('should ...', inject([ApiHandlerService], (service: ApiHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
