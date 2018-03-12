import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
// import { Book } from '../../movies/models/movie';

@Injectable()
export class MovieService {
  private API_PATH = `${environment.api}movies`;

  constructor(private http: HttpClient) {}

  searchMovies(queryTitle: string): Observable<any> {
    return this.http
      .get<{ items }>(`${this.API_PATH}?q=${queryTitle}`)
      .pipe(map(movies => movies || []));
  }
}
