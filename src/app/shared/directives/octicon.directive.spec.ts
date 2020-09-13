import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import { Component } from '@angular/core';
import { OcticonDirective } from './octicon.directive';

@Component({
  selector: 'app-test-container',
  template: `
    <div>
      <span
        id="clone-icon"
        [octicon]="'desktop-download'"
        color="black"
        width="14"
      ></span>
    </div>
  `,
})
class ContainerComponent {}

describe('OcticonDirective', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  let container: ContainerComponent;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent, OcticonDirective],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });

    fixture = TestBed.createComponent(ContainerComponent);
    // fixture.detectChanges(); // without the provider
    container = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  // it('should set background-color to empty when mouse leaves with directive without arguments', () => {
  //   const targetElement = <HTMLSpanElement>element.querySelector('#clone-icon');

  //   expect(targetElement.firstChild.textContent).toEqual(
  //     '<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-desktop-download" aria-hidden="true" style="fill: black; width: 14px; height: 100%;"><path fill-rule="evenodd" d="M4 6h3V0h2v6h3l-4 4-4-4zm11-4h-4v1h4v8H1V3h4V2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1z"></path></svg>'
  //   );
  // });
});
