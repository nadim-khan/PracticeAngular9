import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {
  curUser;
  showVal;
  fileName;
  accessToken;
  excelUrl: SafeUrl;
  showIframe = false;
  showUpdateTable = false;
  showUpdateBtn = false;
  excelData = [];
  editData = this.fb.group({
    id: ['', Validators.required],
    displayName: ['', Validators.required],
    mail: ['', Validators.required],
    address: [''],
    mobile: [''],
  });
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.curUser = this.authService.user;
    // this.authService.wopidata()
    // .subscribe(data => {
    //   console.log('wopiData : ', data);
    // });
  }
  ngOnInit() {
  }

  async postExcel(): Promise<void> {
    await this.authService.addInfoToExcel(this.curUser);
    await this.getExcel();
  }

  delete(i) {
    this.excelData.splice(i, 1);
    this.authService.deleteRowInExcel(i)
      .subscribe(data => {
        console.log('deleteData = > ', data);
      });
  }

  async getExcel(): Promise<void> {
    await this.authService.getInfoFromExcel()
      .subscribe(data => {
        console.log('Hey');
        this.showData(data);
      });
  }

  async showData(retreived) {
    this.excelData = [];
    const rows = retreived.value;
    rows.forEach(rowData => {
      this.excelData.push(rowData.values[0]);
    });
    console.log(this.excelData);
  }
  edit(i) {
    this.showUpdateTable = true;
    this.showUpdateBtn = !this.showUpdateBtn;
    alert(i);
  }

  updateForm() {
    this.showUpdateTable = false;
    this.showUpdateBtn = !this.showUpdateBtn;
    console.log(this.editData.value);
  }
  async OpenExcelFileOnline(): Promise<void> {
    await this.authService.openOnline()
      .subscribe(ExcelLink => {
        this.showIframe = true;
        this.excelUrl = this.sanitizer.bypassSecurityTrustResourceUrl(ExcelLink);
        console.log(this.excelUrl);
      });
  }

  async exportAsXLSX(): Promise<void> {
    this.getExcel();
    this.fileName = 'vComply';
    this.authService.exportAsExcelFile(this.excelData, this.fileName);
  }
  localExcel() {
    window.open('file:///C:/Users/Aleena/Downloads/vComply_export_1585569941821.xlsx');
  }


  async GetWopi(): Promise<void> {
    const val = await this.authService.showWopiData();
    this.accessToken = this.authService.currentToken;
  }

}
