import { HttpParams } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Repository } from '../../models/repository';
import { LanguagesService } from '../../services/languages.service';
import { SearchRepositoriesService } from '../../services/search-repositories.service';
import { hashCode } from '../../utils/helper';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit, OnDestroy {
  // Function declared inside class scope to be inserted on html template
  getColorFromString = hashCode;

  @Output() languagesSelected: EventEmitter<string[]> = new EventEmitter();

  languages: string[] = [];
  selectedLanguages: string[] = [];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  // Private
  private unsubscribeAll$ = new Subject();

  /**
   * Creates an instance of LanguagesComponent.
   */
  constructor(private languagesService: LanguagesService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.languagesService
      .getMany()
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe((res) => {
        this.languages = res.map((l) => l.name);
      });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
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
   * Filter autocomplete values
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.languages.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  /**
   * Sets languages and emits it to parent compomponents
   */
  setLanguage(language: string): void {
    this.selectedLanguages.push(language);
    this.languagesSelected.emit(this.selectedLanguages);
  }

  /**
   * Removes languages and emits it to parent compomponents
   */
  removeLanguage(index: number): void {
    this.selectedLanguages.splice(index, 1);
    this.languagesSelected.emit(this.selectedLanguages);
  }
}
