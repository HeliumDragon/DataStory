import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import * as fromMovies from '../reducers';
import * as movie from '../actions/movie';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Movie Page's responsibility is to map router params
 * to a 'Select' movie action. Actually showing the selected
 * movie remains a responsibility of the
 * SelectedMoviePageComponent
 */
@Component({
  selector: 'ds-view-movie-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ds-selected-movie-page></ds-selected-movie-page>
  `,
})
export class ViewMoviePageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromMovies.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new movie.Select(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}