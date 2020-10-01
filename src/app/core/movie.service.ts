import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private BASE_URL = 'http://localhost:8082/api/admin/movies/';
  constructor(private httpClient: HttpClient) {}

  getMovies() {
    return this.httpClient.get<Movie[]>(this.BASE_URL);
  }

  getMovie(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${this.BASE_URL}${id}`);
  }

  saveMovie(movie: Movie) {
    return this.httpClient.post<Movie>(this.BASE_URL, movie);
  }

  updateMovie(id: number, movie: Movie) {
    return this.httpClient.put<Movie>(`${this.BASE_URL}${id}`, movie);
  }
  deleteMovie(id: number) {
    return this.httpClient.delete<{ message: string }>(`${this.BASE_URL}${id}`);
  }
}
