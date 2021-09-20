import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from './services/app-config.service';
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
    private appSettingsThemeService: ThemeService,
    private appConfig: AppConfigService 
  ) {
  }
  ngOnInit(): void {
    console.log(AppConfigService.settings);
    this.appSettingsThemeService.updateTheme(AppConfigService.settings.themeColors);
  }
}
