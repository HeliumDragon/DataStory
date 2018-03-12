import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromMovies from '../reducers';
import { Movie } from '../models/movie';

@Component({
  selector: 'ds-selected-movie-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ds-movie-detail
      [movie]="movie$ | async">
    </ds-movie-detail>
  `,
})
export class SelectedMoviePageComponent {
  movie$: Observable<Movie>;

  constructor(private store: Store<fromMovies.State>) {
    this.movie$ = store.pipe(select(fromMovies.getSelectedMovie));
  }

}