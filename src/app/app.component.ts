import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReadJsonService } from './services/read-json.service';
import { SendDataService } from './services/send-data.service';
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
    private sendDataService: SendDataService
  ) {
    this.subscription = this.sendDataService.currentMessage.subscribe(data => {
      if (data && data !== 'default message') {
        const dataConvert = JSON.parse(data);
        if (dataConvert && dataConvert.type && dataConvert.type === 'theme') {
          console.log(dataConvert.value);
          this.appSettingsThemeService.updateTheme(`./assets/json/theme${dataConvert.value}.json`);
        }
        // this.getCompany();
      }
    });
  }
  ngOnInit(): void {
    this.appSettingsThemeService.updateTheme('./assets/json/theme1.json');
    // document.documentElement.style.setProperty(`--ci-color-ecko-blue`, '#9fb9c8');
  }
}
