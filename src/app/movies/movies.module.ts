import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { MovieEffects } from './effects/movie';
import { MovieExistsGuard } from './guards/movie-exists';

import { FindMoviePageComponent } from './containers/find-movie-page';
import { ViewMoviePageComponent } from './containers/view-movie-page';
import { SelectedMoviePageComponent } from './containers/selected-movie-page';
import { MovieChartsPageComponent } from './containers/movie-charts-page';

import { MaterialModule } from '../material';

import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ViewMoviePageComponent,
        canActivate: [MovieExistsGuard],
      },
      { path: 'find', component: FindMoviePageComponent },
      { path: '', component: MovieChartsPageComponent },
    ]),

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('movies', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([MovieEffects]),
  ],
  declarations: [
    FindMoviePageComponent,
    ViewMoviePageComponent,
    SelectedMoviePageComponent,
    MovieChartsPageComponent
  ],
  providers: [MovieExistsGuard],
})
export class MoviesModule { }
