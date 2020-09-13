import { TestBed } from '@angular/core/testing';
import { StarredRepositoriesService } from './starred-repositoris.service';

describe('StarredRepositoriesService', () => {
  let service: StarredRepositoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [] });
    service = TestBed.inject(StarredRepositoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
