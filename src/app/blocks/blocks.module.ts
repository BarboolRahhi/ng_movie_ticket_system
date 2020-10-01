import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './root/app.component';
import { BlocksRoutingModule } from './blocks-routing.module';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, BlocksRoutingModule, FontAwesomeModule],
})
export class BlocksModule {}
