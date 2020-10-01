import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenEditComponent } from './screen-edit/screen-edit.component';
import { ScreenListComponent } from './screen-list/screen-list.component';

const routes: Routes = [
  { path: '', component: ScreenListComponent },
  { path: 'add', component: ScreenEditComponent },
  { path: ':id/edit', component: ScreenEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenRoutingModule {}
