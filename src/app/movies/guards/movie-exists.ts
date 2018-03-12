import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter, take, map, tap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MovieService } from '../../core/services/movies.service';
import * as fromMovies from '../reducers';
import * as movie from '../actions/movie';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class MovieExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromMovies.State>,
    private movieService: MovieService,
    private router: Router
  ) {}

  /**
   * This method checks if a book with the given ID is already registered
   * in the Store
   */
  hasMovieInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromMovies.getMovieEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }



  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a book from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return of(true)
    // return this.waitForCollectionToLoad().pipe(
    //   switchMap(() => this.hasBook(route.params['id']))
    // );
  }
}
