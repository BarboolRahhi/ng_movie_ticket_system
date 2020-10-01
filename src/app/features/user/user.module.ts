import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserListComponent, UserEditComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
