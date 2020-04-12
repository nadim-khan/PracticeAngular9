import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalServiceService } from './globalServices/global-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { GoogleAuthService } from './globalServices/google-auth.service';
import { Router } from '@angular/router';
import { AuthService } from './microsoft/auth.service';
import { AlertsService } from './globalServices/alerts.service';

declare global {
  interface Window { googleSDK: (googleuser: any) => void; }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  preserveWhitespaces: true
})
export class AppComponent implements OnInit {
  title = 'Practice 2020';
  gUserData;
  languages;
  public output: Array<string> = new Array<string>();
  public isGSignedIn = false;
  public isMSignedIn = false;
  public googleDisplay = 'block';
  currentUserInfo;
  auth2: any;
  // @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  constructor(
    private globalService: GlobalServiceService,
    private cd: ChangeDetectorRef,
    public gdata: GoogleAuthService,
    private router: Router,
    private mdata: AuthService,
    private alertService: AlertsService) {
    // tslint:disable-next-line: no-string-literal
    window['onSignIn'] = (googleUser) => this.onSignIn(googleUser);
    if (this.gdata.isSignedIn) {
      this.showData();
    }
    // Listen for the signin
    this.gdata.signIn.subscribe(() => {
      this.showData();
    });
    // Listen for signout
    this.gdata.signedOut.subscribe(() => {
      this.clearData();
    });
  }

  onSignIn(googleUser) {
    this.currentUserInfo = googleUser.Pt;
    console.log('==>', this.currentUserInfo);
    this.gdata.onSignIn(googleUser);
    this.isGSignedIn = this.gdata.isSignedIn;
    this.googleDisplay = this.gdata.googleDisplay;
    this.cd.detectChanges();
    if (this.isGSignedIn) {
      this.router.navigateByUrl('/google');
    }
  }

  public async signOut() {
    console.log('calling gdata signout...');
    await this.gdata.signOut();
    console.log('gdata signout finished');
    this.isGSignedIn = this.gdata.isSignedIn;
    this.googleDisplay = this.gdata.googleDisplay;
    this.cd.detectChanges();
    if (!this.isGSignedIn) {
      this.router.navigateByUrl('');
    }
  }

  // async msSignIn(): Promise<void> {
  //    this.isMSignedIn = true;
  //    await this.msService.signIn();
  // }
  // async msSignOut(): Promise<void> {
  //   this.isMSignedIn = false;
  //   await this.msService.signOut();
  // }

  showData() {
    // Useful data for your client-side scripts:
    const profile = this.gdata.googleUser.getBasicProfile();
    this.output.length = 0;
    this.output.push('ID: ' + profile.getId());
    // Don't send this directly to your server!
    this.output.push('Full Name: ' + profile.getName());
    // this.output.push('Given Name: ' + profile.getGivenName());
    // this.output.push('Family Name: ' + profile.getFamilyName());
    // this.output.push('Image URL: ' + profile.getImageUrl());
    this.output.push('Email: ' + profile.getEmail());

    // The ID token you need to pass to your backend:
    // const id_token = this.gdata.googleUser.getAuthResponse().id_token;
    // this.output.push('ID Token: ' + id_token);
  }

  clearData() {
    this.output.length = 0;
    this.output.push('Sign in to see what information it provides.');
  }

  async msSignIn(): Promise<void> {
    this.isMSignedIn = this.mdata.authenticated;
    console.log(this.isGSignedIn + '' + this.isMSignedIn);
    await this.mdata.signIn();
    if (this.isMSignedIn) {
      this.router.navigateByUrl('/microsoft');
    }
  }

  async msSignOut(): Promise<void> {
    this.isMSignedIn = this.mdata.authenticated;
    this.mdata.signOut();
    if (!this.isMSignedIn) {
      this.router.navigateByUrl('');
    }
  }



  ngOnInit() {
    //  this.googleSDK();
    this.languages = this.globalService.languages;
  }

  // prepareLoginButton() {
  //   this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
  //     (googleUser) => {
  //       this.gUserData = googleUser.getBasicProfile();
  //       console.log('Token || ' + googleUser.getAuthResponse().id_token);
  //       console.log('ID: ' + this.gUserData.getId());
  //       console.log('Name: ' + this.gUserData.getName());
  //       console.log('Image URL: ' + this.gUserData.getImageUrl());
  //       console.log('Email: ' + this.gUserData.getEmail());
  //     }, (error) => {
  //       alert(JSON.stringify(error, undefined, 2));
  //     });
  // }
  // googleSDK() {
  //   window['googleSDKLoaded'] = () => {
  //     window['gapi'].load('auth2', () => {
  //       this.auth2 = window['gapi'].auth2.init({
  //         client_id: '327808920490-bpvjeqrdjaid80bap4pdjrkbu4snt3vs.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //         scope: 'profile email https://www.googleapis.com/auth/spreadsheets.readonly'
  //       });
  //       this.prepareLoginButton();
  //     });
  //   }

  //   // tslint:disable-next-line: only-arrow-functions
  //   (function(d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {return;}
  //     js = d.createElement(s); js.id = id;
  //     js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'google-jssdk'));
  //   this.cd.detectChanges();

  // }


}
