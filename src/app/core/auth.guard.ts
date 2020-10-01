import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authService.isAuthorized(allowedRoles);

    console.log('isAuth: ' + isAuthorized);

    if (!isAuthorized) {
      window.alert('You do not have permission to Log in!');
      this.authService.removeToken();
      this.authService.isAuthenticatedUser.next(false);
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
