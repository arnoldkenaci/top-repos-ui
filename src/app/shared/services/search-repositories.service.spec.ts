import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchRepositoriesService } from './search-repositories.service';

describe('SearchRepositoriesService', () => {
  let service: SearchRepositoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(SearchRepositoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
