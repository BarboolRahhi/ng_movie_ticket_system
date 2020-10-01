import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MovieListComponent, MovieEditComponent],
  imports: [CommonModule, MovieRoutingModule, SharedModule],
})
export class MovieModule {}
