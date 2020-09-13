import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseApi {
  protected baseUrl: string;
  /**
   * Creates an instance of BaseApi.
   */
  constructor(public http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  /**
   *
   * Makes a get http request
   *
   */
  public get<T>(url: string, options?: any): Observable<any> {
    return this.http.get<T>(url, options);
  }

  /**
   *
   * Makes a POST http request
   *
   */
  public post<T>(url: string, body: any, options?: any): Observable<any> {
    return this.http.post<T>(url, body, options);
  }

  /**
   *
   * Makes a PUT http request
   *
   */
  public put<T>(url: string, body: any, options?: any): Observable<any> {
    return this.http.put<T>(url, body, options);
  }

  /**
   *
   * Makes a PATCH http request
   */
  public patch<T>(url: string, body: any, options?: any): Observable<any> {
    return this.http.patch<T>(url, body, options);
  }

  /**
   *
   * Makes a DELETE http request
   */
  public delete<T>(url: string, options?: any): Observable<any> {
    return this.http.delete<T>(url, options);
  }
}
