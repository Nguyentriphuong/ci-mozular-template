import {APP_INITIALIZER, Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppConfigInterface, AppDomainInterface } from '../models/global/AppConfigInterface';
import { WINDOW } from '../utils/providers/window.providers';

@Injectable({
  providedIn: 'root'
})

export class AppConfigService {
  static settings: AppConfigInterface;
  static domain: AppDomainInterface;

  constructor(private http: HttpClient, 
    @Inject(WINDOW) private window: Window
    ) {

  }

  loadSetting() {
    const jsonFile = 'assets/environments/app-config.json';
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: AppConfigInterface) => {
        AppConfigService.settings = response as AppConfigInterface;
        let res: AppDomainInterface = {
          domain : this.window.location.hostname
        }
        AppConfigService.domain = {
          domain : this.window.location.hostname
        }
        resolve();
      }).catch((response: any) => {
        reject(`Could not load config file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}
export function ConfigFactory(config: AppConfigService) {
  return () => config.loadSetting();
}

export function init() {
  return {
      provide: APP_INITIALIZER,
      useFactory: ConfigFactory,
      deps: [AppConfigService],
      multi: true
  }
}

const ConfigModule = {
  init: init
}

export { ConfigModule };
// export const WINDOW = new InjectionToken<Window>('window');
