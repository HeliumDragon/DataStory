import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'ds-movie-detail',
  template: `
    <mat-card *ngIf="movie">
      <mat-card-title-group>
        <mat-card-title>{{ title }}- {{movie.info.rating}}</mat-card-title>
        <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
      </mat-card-title-group>
      <mat-card-content>
        <p [innerHtml]="plot"></p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
    :host {
      display: flex;
      justify-content: center;
      margin: 75px 0;
    }
    mat-card {
      max-width: 600px;
    }
    mat-card-title-group {
      margin-left: 0;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    mat-card-content {
      margin: 15px 0 50px;
    }
    mat-card-actions {
      margin: 25px 0 0 !important;
    }
    mat-card-footer {
      padding: 0 25px 25px;
      position: relative;
    }
  `,
  ],
})
export class MovieDetailComponent {
  /**
   * Presentational components receive data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() movie: Movie;
  /**
   * Tip: Utilize getters to keep templates clean
   */
  get id() {
    return this.movie.id;
  }

  get title() {
    return this.movie.title;
  }

  get plot() {
    return this.movie.info.plot;
  }

  get thumbnail() {
    return (
      this.movie.info.image_url
    );
  }
}