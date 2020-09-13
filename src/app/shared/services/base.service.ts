import { Injectable } from '@angular/core';
import { BaseApi } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  protected endpoint: string;

  /**
   * Creates an instance of BaseService.
   */
  constructor(private api: BaseApi) {}

  /**
   *
   * Makes a get http request on the endpoint
   */
  getMany(
    params?: HttpParams
  ): Observable<
    T
    // | GetManyResponse<Partial<T>> | Partial<T>[]
  > {
    return this.api.get(`${environment.baseUrl}/${this.endpoint}`, { params });
  }

  /**
   *
   * Makes a get http request on the endpoint for a single element based on id
   *
   */
  getOne(id: number, params?: HttpParams): Observable<T> {
    return this.api.get(`${environment.baseUrl}/${this.endpoint}/${id}`, {
      params,
    });
  }

  /**
   *
   * Makes a POST http request on the endpoint for a single element
   *
   */
  create(data: T, params?: HttpParams): Observable<T> {
    return this.api.post(`${environment.baseUrl}/${this.endpoint}`, data, {
      params,
    });
  }

  /**
   *
   * Makes a POST http request on the endpoint for a multiple elements
   *
   */
  bulk(data: { bulk: T[] }, params?: HttpParams): Observable<T[]> {
    return this.api.post(`${environment.baseUrl}/${this.endpoint}/bulk`, data, {
      params,
    });
  }

  /**
   *
   * Makes a PATCH http request on the endpoint for a single element based on id
   *
   */
  update(id: number, data: Partial<T>, params?: HttpParams): Observable<T> {
    return this.api.patch(
      `${environment.baseUrl}/${this.endpoint}/${id}`,
      data,
      { params }
    );
  }

  /**
   *
   * Makes a PUT http request on the endpoint for a single element based on id
   *
   */
  replace(id: number, data: T, params?: HttpParams): Observable<T> {
    return this.api.put(`${environment.baseUrl}/${this.endpoint}/${id}`, data, {
      params,
    });
  }

  /**
   *
   * Makes a DELETE http request on the endpoint for a single element based on id
   *
   */
  delete(id: number, params?: HttpParams): Observable<void> {
    return this.api.delete(`${environment.baseUrl}/${this.endpoint}/${id}`, {
      params,
    });
  }
}
