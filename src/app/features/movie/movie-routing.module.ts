import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'add', component: MovieEditComponent },
  { path: ':id/edit', component: MovieEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
