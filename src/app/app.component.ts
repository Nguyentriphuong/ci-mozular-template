import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'EMR_ADMIN';
    ngOnInit(): void {
      document.documentElement.style.setProperty(`--ci-color-ecko-blue`, '#9fb9c8');
    }
}
