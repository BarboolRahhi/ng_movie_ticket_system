import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  logOut() {}

  toggleHandler() {
    console.log('headel-toggle');
    this.toggle.emit();
  }
}
