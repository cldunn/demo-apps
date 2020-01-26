import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppConfigService } from "../../app-config.service";

const UI_BASE: string = "/rest/ui";
const API_BASE: string = "/rest/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
      private http: HttpClient, 
      private appConfig: AppConfigService) { 
      
  }
  
  private handleError(error: any) {
      return throwError(error);
  }
  
  uiGet(url: string, params: HttpParams = new HttpParams()): Observable<any> {
      let targetUrl: string = this.appConfig.hostUrl + UI_BASE + url;  
      
      return this.http.get(targetUrl, {params})
          .pipe(catchError(this.handleError));
  }

  uiPost(url: string, body: any, options: {}): Observable<any> {
      let targetUrl: string = this.appConfig.hostUrl + UI_BASE + url;  
      
      return this.http.post(targetUrl, body, options)
          .pipe(catchError(this.handleError));
  }
  
  apiGet(url: string, params: HttpParams = new HttpParams()): Observable<any> {
      let targetUrl: string = this.appConfig.hostUrl + API_BASE + url;  
      
      return this.http.get(targetUrl, {params})
          .pipe(catchError(this.handleError));
  }

  apiPost(url: string, body: any, options: {withCredentials: true}): Observable<any> {
      let targetUrl: string = this.appConfig.hostUrl + API_BASE + url;  
      
      return this.http.post(targetUrl, body, options)
          .pipe(catchError(this.handleError));
  }

}
