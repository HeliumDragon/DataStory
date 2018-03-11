import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MoviePreviewListComponent } from './movie-preview-list'
import { MoviePreviewComponent } from './movie-preview'
import { MovieSearchComponent } from './movie-search';

import { PipesModule } from '../../shared/pipes';
import { MaterialModule } from '../../material';

export const COMPONENTS = [
  MoviePreviewListComponent,
  MoviePreviewComponent,
  MovieSearchComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
