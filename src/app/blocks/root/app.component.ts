import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-movie-ticket-system';
  show = false;

  toggleHandler(event: any) {
    console.log('toggle');
    this.show = !this.show;
  }
}
