import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Globals } from '../models/global/global';
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
          this.globals.urlFolder = `theme/theme${dataConvert.value}/`;
          debugger
          this.appSettingsThemeService.updateTheme(`./assets/json/theme${dataConvert.value}.json`);
        }
      }
    });
  }

  changeData(data: any): void {
    this.dataSource.next(data);
  }
  getGlobalValue() {
    return this.globals;
  }
}
