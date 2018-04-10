import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bc-toolbar',
  template: `
    <mat-toolbar color="primary">
      <ng-content></ng-content>
    </mat-toolbar>
  `,
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
