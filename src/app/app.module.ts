import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { BlocksModule } from './blocks/blocks.module';
import { AppComponent } from './blocks/root/app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { TheaterModule } from './features/theater/theater.module';
import { MovieModule } from './features/movie/movie.module';
import { ScreenModule } from './features/screen/screen.module';
import { UserModule } from './features/user/user.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlocksModule,
    CoreModule,
    TheaterModule,
    MovieModule,
    ScreenModule,
    UserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
