import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Creates an instance of StorageService.
   */
  constructor() {}

  /**
   * Gets value from locastorage based on key
   */
  get(key: string, type?: string): string | any {
    if (!type) {
      return localStorage.getItem(key);
    } else if (type === 'Object') {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    }
  }

  /**
   * Gets all values from locastorage
   */
  getAll(): any[] {
    const filterArray = [];
    for (let i = 0; i < localStorage.length; i++) {
      const element = JSON.parse(localStorage.getItem(localStorage.key(i)));
      filterArray.push(element);
    }
    return filterArray;
  }

  /**
   * Sets key and value on locastorage
   */
  set(key: string, value: any, type?: string): void {
    if (!type) {
      localStorage.setItem(key, value);
    } else if (type === 'Object') {
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
    }
  }

  /**
   * Deletes value on localstorage based on key
   */
  delete(key: string): void {
    localStorage.removeItem(key);
  }
}
