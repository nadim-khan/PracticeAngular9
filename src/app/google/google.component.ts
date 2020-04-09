import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GoogleAuthService } from '../globalServices/google-auth.service';
import { RequestModel } from './requestModel';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit {

  public model = new RequestModel();
  public output: string;

  constructor(
    private cd: ChangeDetectorRef,
    public gauth: GoogleAuthService) {
    this.output = 'Enter a spreadsheet id and range then press submit. '
    + 'Ensure that third-party cookies are enabled in your browser settings.';
  }

  ngOnInit() { }

  async onSubmit() {
    this.output = 'Processing submission...';
    console.log(JSON.stringify(this.model));
    await this.gauth.loadClient();
    console.log('client loaded');
    await this.gauth.loadSheetsAPI();
    console.log('sheets v4 loaded');

    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this.model.sheetId,
      range: this.model.range
    }).then((response) => {
      console.log('Range retrieved: '
        + response.result.values[0]);
      this.output = 'Data found: \n';
      for (const v of response.result.values) {
        this.output += v + '\n';
      }
      this.cd.detectChanges();
    }, (error) => {
      this.output = 'Error: \n';
      this.output += error.result.error.message + '\n';
      this.cd.detectChanges();
    });



  } // End of onSubmit method

}
