import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE_URL = 'http://localhost:8082/api/admin/users/';
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<User[]>(this.BASE_URL);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.BASE_URL}${id}`);
  }

  saveUser(user: User) {
    return this.httpClient.post<User>(this.BASE_URL, user);
  }

  updateUser(id: number, user: User) {
    return this.httpClient.put<User>(`${this.BASE_URL}${id}`, user);
  }

  deleteUser(id: number) {
    return this.httpClient.delete<{ message: string }>(`${this.BASE_URL}${id}`);
  }
}
