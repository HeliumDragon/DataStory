import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ds-movie-charts-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ds-movie-bubble></ds-movie-bubble>  
  `,
})
export class MovieChartsPageComponent {

  constructor() {}

}
