import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import * as fromMovies from '../reducers';

import * as movie from '../actions/movie';
import { Movie } from '../models/movie';

@Component({
  selector: 'bc-find-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ds-movie-search [query]="searchQuery$ | async" [searching]="loading$ | async" [error]="error$ | async" (search)="search($event)"></ds-movie-search>
    <ds-movie-preview-list [movies]="movies$ | async"></ds-movie-preview-list>
  `,
})
export class FindMoviePageComponent {
  searchQuery$: Observable<string>;
  movies$: Observable<Movie[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromMovies.State>) {
    this.searchQuery$ = store.pipe(select(fromMovies.getSearchQuery), take(1));
    this.movies$ = store.pipe(select(fromMovies.getSearchResults));
    this.loading$ = store.pipe(select(fromMovies.getSearchLoading));
    this.error$ = store.pipe(select(fromMovies.getSearchError));
  }

  search(query: string) {
    this.store.dispatch(new movie.Search(query));
  }
}
