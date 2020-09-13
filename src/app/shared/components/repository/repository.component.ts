import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Repository } from '../../models/repository';
import { hashCode } from '../../utils/helper';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StarredRepositoriesService } from '../../services/starred-repositoris.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
})
export class RepositoryComponent implements OnInit, OnDestroy {
  @Input() repository: Repository;
  @Output() repositoryStarsChange: EventEmitter<
    Repository
  > = new EventEmitter();

  // Function declared inside class scope to be inserted on html template
  getColorFromString = hashCode;

  // Private
  private unsubscribeAll$ = new Subject();

  /**
   * Creates an instance of DashboardComponent.
   */
  constructor(
    private snackBar: MatSnackBar,
    private starredRepositoriesService: StarredRepositoriesService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {}

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
   * Calls snackbar with configuration
   *
   */
  openSnackBar(message: string): void {
    const snackBar = this.snackBar.open(message, '', {
      duration: 4000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  /**
   * Calls snackbar when repository clone command is coppied
   *
   */
  onGitClone(): void {
    this.openSnackBar('GitHub clone command was coppied on your clipdoard.');
  }

  /**
   * Stars a repository, increases star count and saves it on localstorage
   *
   */
  starRepository(repository: Repository): void {
    if (repository.isStarred) {
      repository.stargazers_count--;
      this.starredRepositoriesService.remove(repository);
    } else {
      repository.stargazers_count++;
      this.starredRepositoriesService.add(repository);
    }
    repository.isStarred = !repository.isStarred;
    this.repositoryStarsChange.emit(repository);
  }
}
