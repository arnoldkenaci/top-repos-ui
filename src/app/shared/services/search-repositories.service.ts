import { Injectable } from '@angular/core';
import { BaseApi } from './api.service';
import { BaseService } from './base.service';
import { SearchResponse } from '../models/search-response';
import { Repository } from '../models/repository';

@Injectable({ providedIn: 'root' })
export class SearchRepositoriesService extends BaseService<
  SearchResponse<Repository>
> {
  /**
   * Creates an instance of SearchRepositoriesService.
   */
  constructor(private baseApi: BaseApi) {
    super(baseApi);
    this.endpoint = 'search/repositories';
  }
}
