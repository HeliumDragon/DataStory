import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
// import { Book } from '../../movies/models/movie';

@Injectable()
export class MovieService {
  private API_PATH = 'https://0kwp7m4pz6.execute-api.eu-west-2.amazonaws.com/dev/movies';

  constructor(private http: HttpClient) {}

  searchMovies(queryTitle: string): Observable<any> {
    return this.http
      .get<{ items }>(`${this.API_PATH}?q=${queryTitle}`)
      .pipe(map(movies => movies || []));
  }
}
