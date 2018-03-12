import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'ds-movie-preview-list',
  template: `
    <ds-movie-preview *ngFor="let movie of movies" [movie]="movie"></ds-movie-preview >
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  ],
})
export class MoviePreviewListComponent {
  @Input() movies: Movie[];
}
