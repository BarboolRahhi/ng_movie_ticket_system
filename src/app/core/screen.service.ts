import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Screen } from './models/screen';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private BASE_URL = 'http://localhost:8082/api/admin/screens/';
  constructor(private httpClient: HttpClient) {}

  getScreens() {
    return this.httpClient.get<Screen[]>(this.BASE_URL);
  }

  getScreen(id: number): Observable<Screen> {
    return this.httpClient.get<Screen>(`${this.BASE_URL}${id}`);
  }

  saveScreen(screen: Screen) {
    return this.httpClient.post<Screen>(this.BASE_URL, screen);
  }

  updateScreen(id: number, screen: Screen) {
    return this.httpClient.put<Screen>(`${this.BASE_URL}${id}`, screen);
  }
  deleteScreen(id: number) {
    return this.httpClient.delete<{ message: string }>(`${this.BASE_URL}${id}`);
  }
}
