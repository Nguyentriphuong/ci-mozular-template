import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AppConfigInterface } from '../models/global/AppConfigInterface';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  static settings: AppConfigInterface;

  constructor(private http: HttpClient) {

  }

  loadSetting() {
    const jsonFile = '../../assets/environments/app-config.json';
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: AppConfigInterface) => {
        AppConfigService.settings = response as AppConfigInterface;
        console.log(AppConfigService.settings);
        
        resolve();
      }).catch((response: any) => {
        reject(`Could not load config file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}
