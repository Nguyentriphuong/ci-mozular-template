import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/models/home/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  model: any = {
    Color: '#9fb9c8',
    Nav: 1
  };
  config = new CompanyModel();
  option = {
    avatar: true,
    titles: ['Company Information', 'Package Information', 'Payment method'],
    search: false,
    col: 'col-5 col-5c'
  };
  listCreate = [];
  btnConfig: any = {
    isEventUpdate: false,
    listUpdate: { cancel: true, save: true },
    listNoUpdate: { edit2: true},
    listRenew: { renew: true, },
    listPayment: { history: true,  method: true}
  };
  configCss: any = {
    height: 'calc(100vh - 210px)',
    isShowPayment: false,
    css: 'insideShadow'
  };
  subscription: Subscription;

  constructor(
    private service: CompanyService,
    private sendDataService: SendDataService,
    private swal: SwalService
  ) { }

  ngOnInit(): void {
    // document.documentElement.style.setProperty(`--ci-color-ecko-blue`, '#2C2EB8');
    // console.log(123);
    // setTimeout(() => {
    //   document.documentElement.style.setProperty(`--ci-color-ecko-blue`, '#F13F5D');

    // }, 5000);
    this.listCreate = this.config.create;
    //this.getCompany(false);
  }
  getCompany(check): void {
    this.service.detail().subscribe(res => {
      this.model = res;
      if (check === true) {
        console.log(JSON.stringify(this.model));
        this.sendDataService.changeData(JSON.stringify(this.model));
      }
    });
  }
  handleCallback = (value) => {
    if (value.type === 'save') {
      console.log(value);
      let listNav = [
        {
          icon: 'assets/svg/Company.svg',
          name: 'Company',
          router: '/company'
        },
        {
          icon: 'assets/svg/Subcription.svg',
          name: 'Subscription',
          router: '/subscription'
        },
        {
          icon: 'assets/svg/Employee.svg',
          name: 'Employee',
          router: '/employee'
        },
        {
          icon: 'assets/svg/Lists.svg',
          name: 'Lists',
          router: '/management'
        },
        {
          icon: 'assets/svg/report.svg',
          name: 'Report',
          router: '/report'
        }
      ];
      if (value.data.Nav === 2) {
        listNav = [
          {
            icon: 'assets/svg/Company.svg',
            name: 'Company',
            router: '/company'
          },
          {
            icon: 'assets/svg/Employee.svg',
            name: 'Employee',
            router: '/employee'
          },
          {
            icon: 'assets/svg/Lists.svg',
            name: 'Lists',
            router: '/management'
          },
          {
            icon: 'assets/svg/Subcription.svg',
            name: 'Subscription',
            router: '/subscription'
          }
        ];
        const data =  {
          type: 'nar',
          ListNav: listNav
        };
        console.log(JSON.stringify(listNav));
        this.sendDataService.changeData(JSON.stringify(data));
      }
      document.documentElement.style.setProperty(`--ci-color-ecko-blue`, value.data.Color);
      // this.service.update(value.data.CompanyId, value.data).subscribe(res => {
      //   // this.swal.success('Update success');
      //   this.btnConfig.isEventUpdate = false;
      //   this.getCompany(true);
      // });
    }
    this.btnConfig.isEventUpdate = false;

  }

}
