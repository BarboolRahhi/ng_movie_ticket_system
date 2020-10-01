import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheaterRoutingModule } from './theater-routing.module';
import { EditTheaterComponent } from './edit-theater/edit-theater.component';
import { TheaterListComponent } from './theater-list/theater-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditTheaterComponent, TheaterListComponent],
  imports: [CommonModule, TheaterRoutingModule, SharedModule],
})
export class TheaterModule {}
