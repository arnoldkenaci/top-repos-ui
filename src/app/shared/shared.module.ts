import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcticonDirective } from './directives/octicon.directive';

@NgModule({
  declarations: [OcticonDirective],
  imports: [CommonModule],
  exports: [OcticonDirective],
})
export class SharedModule {}
