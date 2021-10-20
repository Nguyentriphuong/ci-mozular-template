import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '../utils/providers/window.providers';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(@Inject(WINDOW) private window: Window) {
  }

  getHostname() : string {
      return this.window.location.hostname;
  }
}
