import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalServiceService } from './globalServices/global-service.service';
import { GoogleComponent } from './google/google.component';
import { MicrosoftComponent } from './microsoft/microsoft.component';
import { GoogleAuthService } from './globalServices/google-auth.service';
import { JsLoaderService } from './globalServices/js-loader.service';
import { HomeComponent } from './home/home.component';
import { WopiApiComponent } from './wopi-api/wopi-api.component';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from 'src/oauth';
import { AuthService } from './microsoft/auth.service';
import { AboutComponent } from './about/about.component';
import { ExcelComponent } from './microsoft/excel/excel.component';
import { CalenderComponent } from './microsoft/calender/calender.component';
import { AlertsComponent } from './alerts/alerts.component';

library.add(faExternalLinkAlt);
library.add(faUserCircle);
@NgModule({
  declarations: [
    AppComponent,
    GoogleComponent,
    MicrosoftComponent,
    HomeComponent,
    WopiApiComponent,
    AboutComponent,
    ExcelComponent,
    CalenderComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    MsalModule.forRoot({
      clientID: OAuthSettings.appId
    }),
  ],
  providers: [
    GlobalServiceService,
    JsLoaderService,
    GoogleAuthService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
