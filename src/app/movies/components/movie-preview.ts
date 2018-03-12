import { Component, Input } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'ds-movie-preview',
  template: `
    <a [routerLink]="['/movies', id]">
      <mat-card>
        <mat-card-title-group>
          <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
          <mat-card-title>{{ title | bcEllipsis:35 }} - {{year}}</mat-card-title>
          <mat-card-subtitle *ngIf="actors">{{ actors | bcEllipsis:40 }}</mat-card-subtitle>
        </mat-card-title-group>
        <mat-card-content>
          <p *ngIf="plot">{{ plot | bcEllipsis }}</p>
        </mat-card-content>
        <mat-card-footer>
         <p> {{directors}} </p>
        </mat-card-footer>
      </mat-card>
    </a>
  `,
  styles: [
    `
    :host {
      display: flex;
    }

    :host a {
      display: flex;
    }

    mat-card {
      width: 400px;
      margin: 15px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
      mat-card {
        margin: 15px 0 !important;
      }
    }
    mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    mat-card-title {
      margin-right: 10px;
    }
    mat-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    mat-card-content {
      margin-top: 15px;
      margin: 15px 0 0;
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    mat-card-footer {
      padding: 0 25px 25px;
    }
  `,
  ],
})
export class MoviePreviewComponent {
  @Input() movie: Movie;

  get id() {
    return this.movie.id;
  }
  
  get title() {
    return this.movie.title;
  }

  get year() {
    return this.movie.year
  }

  get actors () {
    return this.movie.info.actors.join(', ')
  }

  get plot() {
    return this.movie.info.plot;
  }

  get directors() {
    return this.movie.info.directors.join(', ')
  }

  get thumbnail(): string | boolean {
    if (this.movie.info.image_url) {
      return this.movie.info.image_url;
    }
    return false;
  }
}
