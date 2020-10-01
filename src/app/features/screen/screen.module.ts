import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenRoutingModule } from './screen-routing.module';
import { ScreenListComponent } from './screen-list/screen-list.component';
import { ScreenEditComponent } from './screen-edit/screen-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ScreenListComponent, ScreenEditComponent],
  imports: [CommonModule, ScreenRoutingModule, SharedModule],
})
export class ScreenModule {}
