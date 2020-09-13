import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchRepositoriesService } from '../../shared/services/search-repositories.service';
import { HttpParams } from '@angular/common/http';
import { Repository } from '../../shared/models/repository';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { myAnimations } from '../../shared/animations';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReposFilterEnum } from '../../shared/enums/repos-filter.enum';
import { StarredRepositoriesService } from '../../shared/services/starred-repositoris.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: myAnimations,
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Variables for holding last week and today to make http request
  // for repost of last week
  lastWeek = moment().add(-1, 'week').format('YYYY-MM-DD');
  today = moment().format('YYYY-MM-DD');

  repositories: Repository[];
  starredRepositories: Repository[];

  // Http params for repositories
  httpParams: HttpParams;

  totalRepositories: number;

  // Filters all or only starred repos from reposiries
  reposFilter: ReposFilterEnum = ReposFilterEnum.ALL;

  reposFilterEnum = ReposFilterEnum;

  // Filter values for filtering repositories
  filterValues = [
    { text: 'All repos', value: ReposFilterEnum.ALL },
    { text: 'Starred repos', value: ReposFilterEnum.STARRED },
  ];

  disablePaginator = false;

  languages: string[];

  // Private
  private unsubscribeAll$ = new Subject();

  /**
   * Creates an instance of DashboardComponent.
   */
  constructor(
    private searchRepositoriesService: SearchRepositoriesService,
    private spinnerService: NgxSpinnerService,
    private starredRepositoriesService: StarredRepositoriesService
  ) {
    this.httpParams = new HttpParams()
      .append('q', `created:>${this.lastWeek}`)
      .append(`sort`, `stars`)
      .append(`order`, `desc`)
      .append('page', `1`)
      .append('per_page', '9');
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.getStarredRepositories();
    this.getAllRepositories(this.httpParams);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Gets  all repositories
   */
  getAllRepositories(httpParams: HttpParams, languages?: string[]): void {
    this.spinnerService.show();
    if (languages && languages.length) {
      const languagesQuery = languages.map((language) => {
        return `+language:${language}`;
      });
      httpParams = httpParams.set(
        'q',
        `created:>${this.lastWeek}` + languagesQuery
      );
    }
    this.searchRepositoriesService
      .getMany(httpParams)
      .pipe(
        finalize(() => this.spinnerService.hide()),
        takeUntil(this.unsubscribeAll$)
      )
      .subscribe((res) => {
        if (this.reposFilter === ReposFilterEnum.ALL) {
          if (!this.starredRepositories) {
            this.repositories = res.items;
          } else {
            this.repositories = res.items.map((repository) => {
              if (
                this.starredRepositories.filter(
                  (r) => repository.id === r.id
                )[0]
              ) {
                repository.stargazers_count++;
                repository.isStarred = true;
              }
              return repository;
            });
          }
          this.totalRepositories = res.total_count;
        }
      });
  }

  /**
   * Gets  starred repositories
   */
  getStarredRepositories(languages?: string[]) {
    this.starredRepositories = this.starredRepositoriesService.getAll();
    if (languages && languages.length) {
      this.starredRepositories = this.starredRepositories.filter(
        (repository) => {
          return languages.includes(repository.language);
        }
      );
    }
    if (this.reposFilter === ReposFilterEnum.STARRED) {
      this.repositories = this.starredRepositories;
    }
  }

  /**
   * Sets selected languages on filter
   */
  setLanguagesSelected(languages: string[]): void {
    this.languages = languages;
    this.getStarredRepositories(languages);
    this.getAllRepositories(this.httpParams, languages);
  }

  /**
   * Change page for repositories request
   */
  changePage(page: PageEvent): void {
    this.httpParams = this.httpParams.set('page', `${++page.pageIndex}`);
    this.getAllRepositories(this.httpParams, this.languages);
  }

  /**
   * Set filter for repos
   */
  setReposFilter(reposFilter: ReposFilterEnum) {
    this.reposFilter = reposFilter;
    if (reposFilter === ReposFilterEnum.ALL) {
      this.getAllRepositories(this.httpParams, this.languages);
      this.disablePaginator = false;
    } else {
      this.getStarredRepositories(this.languages);
      this.repositories = this.starredRepositories;
      this.disablePaginator = true;
    }
  }

  /**
   * Emits when repositories stars change
   */
  repositoryStarsChange() {
    if (this.reposFilter === ReposFilterEnum.STARRED) {
      this.getStarredRepositories(this.languages);
      this.repositories = this.starredRepositories;
    }
  }
}
