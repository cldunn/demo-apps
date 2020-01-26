import { Component, OnInit } from '@angular/core';

import { HttpParams } from '@angular/common/http';

import { AppConfigService } from './app-config.service';
import { ApiService } from "./shared/service/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Demo';
  greeting = {'id': 'XXX', 'content': 'Hello World'};

  constructor(
      private appConfigService: AppConfigService,
      private apiService: ApiService) {
      
      console.log('enableDebugTools: ', appConfigService.enableDebugTools);
      console.log('production: ', appConfigService.production);
      console.log('logLevel: ', appConfigService.logLevel);
      console.log('hostUrl: ', appConfigService.hostUrl);
      
      this.apiService.apiGet("/resource/home", new HttpParams()).subscribe((resp) => {
          this.greeting = resp;
      });
  }
  
  ngOnInit() {
      /*
      const params = new HttpParams()
          .set('name', 'Cliff');

      this.apiService.uiGet("/login/pageConfig").subscribe((resp) => {
          console.log('result: ', resp);
      });
      */
      
      const params = new HttpParams().set('firstName', 'Cliff');
      this.apiService.uiGet("/login/pageConfig", params).subscribe((resp) => {
          console.log('resp: ', resp);
      },(error) => {
          console.log('error', error);
      });
      

  }
}
