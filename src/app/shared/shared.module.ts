import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortByPipe } from './sort-by.pipe';
import { FilterByPipe } from './filter-by.pipe';

@NgModule({
  declarations: [SortByPipe, FilterByPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [FormsModule, ReactiveFormsModule, FontAwesomeModule, SortByPipe],
})
export class SharedModule {}
