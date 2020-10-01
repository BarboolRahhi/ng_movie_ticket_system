import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignInRequest } from './models/UserSignInRequest';
import { JwtResponse } from './models/JwtResponse';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import * as jwt_decode from 'jwt-decode';
import { JwtInterceptor } from './jwt.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'http://localhost:8082/api/auth';
  public isAuthenticatedUser = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  isAuthorized(allowedRoles: string): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    // if (allowedRoles == null) {
    //   return true;
    // }

    // get token from local storage or state management
    const userInfo: JwtResponse = JSON.parse(
      localStorage.getItem('currentUser')
    );

    if (userInfo == null) {
      return false;
    }

    // decode token to read the payload details
    const decodeToken = jwt_decode(userInfo.token);

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      console.log('Invalid token');
      return false;
    }
    //  ROLE_ADMIN -> routing == ROLE_USER -> token
    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(decodeToken['roles']);
  }

  login(request: UserSignInRequest) {
    return this.httpClient
      .post<JwtResponse>(`${this.BASE_URL}/signin`, request)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        })
      );
  }
  public removeToken() {
    localStorage.removeItem('currentUser');
  }

  public setAuthenticateUser() {
    if (localStorage.getItem('currentUser')) {
      this.isAuthenticatedUser.next(true);
    } else {
      this.isAuthenticatedUser.next(false);
    }
  }

  public getUserInfo() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
