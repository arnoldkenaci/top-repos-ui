import { Injectable } from '@angular/core';
import { BaseApi } from './api.service';
import { BaseService } from './base.service';

import { Language } from '../models/language';

@Injectable({ providedIn: 'root' })
export class LanguagesService extends BaseService<Language[]> {
  /**
   * Creates an instance of SearchRepositoriesService.
   */
  constructor(private baseApi: BaseApi) {
    super(baseApi);
    this.endpoint = 'languages';
  }
}
