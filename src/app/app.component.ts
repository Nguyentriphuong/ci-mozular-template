import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EMR_ADMIN';
  subscription: Subscription;
  constructor(
    private appSettingsThemeService: ThemeService
  ) {
  }
  ngOnInit(): void {
    this.appSettingsThemeService.updateTheme('../assets/theme/theme1/theme.json');
    // document.documentElement.style.setProperty(`--ci-color-ecko-blue`, '#9fb9c8');
  }
}
