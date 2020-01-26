import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EnvServiceProvider } from './shared/service/env.service.provider';
import { HttpInterceptorService } from "./shared/service/http-interceptor.service";
import { ServerErrorComponent } from './shared/component/server-error/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    EnvServiceProvider,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ServerErrorComponent]
})
export class AppModule { }
