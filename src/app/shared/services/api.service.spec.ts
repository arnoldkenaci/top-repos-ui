import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseApi } from './api.service';

describe('BaseApi', () => {
  let service: BaseApi;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(BaseApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
