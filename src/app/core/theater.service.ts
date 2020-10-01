import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theater } from 'src/app/core/models/theater';

@Injectable({
  providedIn: 'root',
})
export class TheaterService {
  private BASE_URL = 'http://localhost:8082/api/admin/theaters/';
  constructor(private httpClient: HttpClient) {}

  getTheaters() {
    return this.httpClient.get<Theater[]>(this.BASE_URL);
  }

  getTheater(id: number): Observable<Theater> {
    return this.httpClient.get<Theater>(`${this.BASE_URL}${id}`);
  }

  saveTheater(theater: Theater) {
    return this.httpClient.post<Theater>(this.BASE_URL, theater);
  }

  updateTheater(id: number, theater: Theater) {
    return this.httpClient.put<Theater>(`${this.BASE_URL}${id}`, theater);
  }
  deleteTheater(id: number) {
    return this.httpClient.delete<{ message: string }>(`${this.BASE_URL}${id}`);
  }
}
