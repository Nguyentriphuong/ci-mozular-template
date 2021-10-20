import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Globals } from '../models/global/global';
import { AppConfigService } from './app-config.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class BaseThemeService {

  private globals = new Globals;
  private dataSource = new BehaviorSubject('default message');
  currentMessage = this.dataSource.asObservable();
    constructor(private appSettingsThemeService: ThemeService) {
    this.currentMessage.subscribe(data => {
      if (data && data !== 'default message') {
        const dataConvert = JSON.parse(data);
        console.log(dataConvert);
        
        if (dataConvert && dataConvert.type && dataConvert.type === 'theme') {
          this.globals.urlFolder = `assets/theme/theme${dataConvert.value}/`;
          this.appSettingsThemeService.updateTheme(`./assets/theme/theme${dataConvert.value}/theme.json`);
        }
      }
    });
  }

  changeData(data: any): void {
    this.dataSource.next(data);
  }
  setInitValue() {
    console.log(AppConfigService.domain);
    this.globals.urlFolder = `assets/theme/${AppConfigService.domain.domain}/`;
    this.appSettingsThemeService.updateTheme(`assets/theme/${AppConfigService.domain.domain}/theme.json`);
    // this.globals.urlFolder = AppConfigService.settings.apiImagesSource;
    // this.appSettingsThemeService.updateTheme(AppConfigService.settings.themeColors);
  }
  getGlobalValue() {
    return this.globals;
  }
}
