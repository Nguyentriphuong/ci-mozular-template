import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Globals } from 'src/app/models/global/global';
import { BaseThemeService } from 'src/app/services/base-theme.service';
import { CompanyService } from 'src/app/services/company.service';
import { SendDataService } from 'src/app/services/send-data.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  globals: Globals = new Globals();
  listNav = [];
  subscription: Subscription;
  constructor(
    private service: CompanyService,
    private sendDataService: SendDataService, 
    private basethemeService: BaseThemeService
  ) {  }

  companyDetal: any;
  ngOnInit(): void {
    this.globals = this.basethemeService.getGlobalValue();
    this.updateNar();
    this.basethemeService.currentMessage.subscribe(data => {
      if (data && data !== 'default message') { 
        setTimeout(() => {
          console.log(this.globals, this.listNav);
          this.updateNar();
        }, 100);
      }
    })
    this.subscription = this.sendDataService.currentMessage.subscribe(data => {
      if (data && data !== 'default message') {
        const dataConvert = JSON.parse(data);
        if (dataConvert && dataConvert.type && dataConvert.type === 'nar') {
          this.listNav = dataConvert.ListNav;
        } else {
          this.companyDetal = JSON.parse(data);
        }
        setTimeout(() => {
          console.log(this.globals, this.listNav);
          
        }, 100);
        // this.getCompany();
      }
    });
    this.getCompany();
  }
  getCompany(): void {
    this.service.detail().subscribe(res => {
      this.companyDetal = res;
    });
  }
  updateNar() {
    this.listNav = [
      {
        icon: `assets/${this.globals.urlFolder}svg/Company.svg`,
        name: 'Company',
        router: '/company'
      },
      {
        icon: `assets/${this.globals.urlFolder}svg/Subcription.svg`,
        name: 'Subscription',
        router: '/subscription'
      },
      {
        icon: `assets/${this.globals.urlFolder}svg/Employee.svg`,
        name: 'Employee',
        router: '/employee'
      },
      {
        icon: `assets/${this.globals.urlFolder}svg/Lists.svg`,
        name: 'Lists',
        router: '/management'
      },
      {
        icon: `assets/${this.globals.urlFolder}svg/report.svg`,
        name: 'Report',
        router: '/report'
      }
    ];
  }
}

@NgModule({
  declarations: [
    MenuBarComponent
  ],
  providers: [ Globals ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [MenuBarComponent]
})
export class MenuBarModule { }
