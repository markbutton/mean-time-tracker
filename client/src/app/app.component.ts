import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavGuard } from './guards/nav.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'Time Tracker';
  isDarkTheme = false;

  constructor(
    private navGuard: NavGuard
  ) {}

}
