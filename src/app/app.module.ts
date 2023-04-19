import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RestInterceptorService } from './services/interceptors/rest.interceptor';
import { ConfigService } from './services/config/config.service';
import { IConfig } from './models/config';
// import { DirectiveComponent } from './directive/directive.component';

function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}


@NgModule({
  declarations: [
    AppComponent,
    // DirectiveComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  
  providers: [

    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },
    

    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorService, multi: true},
    

  ],

  bootstrap: [AppComponent]
})

export class AppModule { }

