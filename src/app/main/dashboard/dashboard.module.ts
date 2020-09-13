import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Route } from '@angular/router';
import { RepositoryModule } from '../../shared/components/repository/repository.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { LanguagesModule } from '../../shared/components/languages/languages.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RepositoryModule,
    FlexLayoutModule,
    MatChipsModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    HttpClientModule,
    LanguagesModule,
    MatPaginatorModule,
    NgxSpinnerModule,
  ],
})
export class DashboardModule {}
