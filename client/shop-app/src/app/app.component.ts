import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string;
  version: string;

  constructor() {
    this.title = 'Shop App';
    this.version = '1.0.0';
  }
}
