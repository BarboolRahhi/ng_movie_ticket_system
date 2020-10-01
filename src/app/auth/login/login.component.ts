import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../core/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginform') logInForm: NgForm;

  private subscription: Subscription;
  error = null;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.isAuthenticatedUser.subscribe(
      (data) => {
        if (data) {
          this.router.navigate(['/theater']);
        }
      }
    );
  }

  signIn() {
    this.authService.login(this.logInForm.value).subscribe(
      (data) => {
        this.authService.isAuthenticatedUser.next(true);
        if (this.authService.isAuthorized('ROLE_ADMIN')) {
          this.toastr.success('Login Successfully!');
          this.logInForm.reset();
        }
      },
      (error) => {
        console.log(error.error.message);
        this.toastr.error(error.error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
