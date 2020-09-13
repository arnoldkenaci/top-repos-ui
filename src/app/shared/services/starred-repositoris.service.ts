import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Repository } from '../models/repository';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class StarredRepositoriesService {
  /**
   * Creates an instance of StarredRepositoriesService.
   */
  constructor(private storageService: StorageService) {}

  /**
   * Get all starred repositories from storage
   */
  getAll(): Repository[] | null {
    const starredRepositoriesString = this.storageService.get(
      environment.starredReposKey
    );
    if (starredRepositoriesString) {
      return JSON.parse(starredRepositoriesString).map((repo) => {
        repo.isStarred = true;
        return repo;
      });
    }
    return null;
  }

  /**
   * Adds one reposiory to storage
   */
  add(repository: Repository): Repository[] | null {
    let starredRepositories = this.getAll();
    if (!starredRepositories) {
      starredRepositories = [];
    }
    const reposioryToBeSaved = { ...repository };
    delete reposioryToBeSaved.isStarred;
    starredRepositories.push(reposioryToBeSaved);
    this.storageService.set(
      environment.starredReposKey,
      JSON.stringify(starredRepositories)
    );
    return starredRepositories;
  }

  /**
   * Removes one reposiory from storage
   */
  remove(repository: Repository): Repository[] | null {
    let starredRepositories = this.getAll();
    if (!starredRepositories) {
      return [];
    }
    const reposioryToBeSaved = { ...repository };
    delete reposioryToBeSaved.isStarred;
    starredRepositories.splice(
      starredRepositories.indexOf(reposioryToBeSaved),
      1
    );
    this.storageService.set(
      environment.starredReposKey,
      JSON.stringify(starredRepositories)
    );
    return starredRepositories;
  }
}
