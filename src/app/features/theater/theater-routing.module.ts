import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditTheaterComponent } from './edit-theater/edit-theater.component';
import { TheaterListComponent } from './theater-list/theater-list.component';

const routes: Routes = [
  { path: '', component: TheaterListComponent },
  { path: 'add', component: EditTheaterComponent },
  { path: ':id/edit', component: EditTheaterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TheaterRoutingModule {}
