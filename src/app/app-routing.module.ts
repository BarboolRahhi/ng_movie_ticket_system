import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'theater',
    loadChildren: () =>
      import('./features/theater/theater.module').then((m) => m.TheaterModule),
    canActivate: [AuthGuard],
    data: {
      allowedRoles: 'ROLE_ADMIN',
    },
  },
  {
    path: 'movie',
    loadChildren: () =>
      import('./features/movie/movie.module').then((m) => m.MovieModule),
    canActivate: [AuthGuard],
    data: {
      allowedRoles: 'ROLE_ADMIN',
    },
  },
  {
    path: 'screen',
    loadChildren: () =>
      import('./features/screen/screen.module').then((m) => m.ScreenModule),
    canActivate: [AuthGuard],
    data: {
      allowedRoles: 'ROLE_ADMIN',
    },
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
    data: {
      allowedRoles: 'ROLE_ADMIN',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
