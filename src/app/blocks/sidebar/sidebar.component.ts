import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../core/auth.service';
import {
  faUser,
  faDesktop,
  faTicketAlt,
  faFilm,
  faSignOutAlt,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  faUser = faUser;
  faDesktop = faDesktop;
  faTicketAlt = faTicketAlt;
  faFilm = faFilm;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;

  @Input() show: boolean;
  authenticate = false;
  private subscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {
    console.log('Show:', this.show);
  }

  ngOnInit(): void {
    this.authService.setAuthenticateUser();
    this.subscription = this.authService.isAuthenticatedUser.subscribe(
      (data) => {
        if (data) {
          this.authenticate = true;
        } else {
          this.authenticate = false;
        }
      }
    );
  }

  logOut() {
    this.authService.removeToken();
    this.authService.isAuthenticatedUser.next(false);
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
