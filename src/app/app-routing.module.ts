import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleComponent } from './google/google.component';
import { MicrosoftComponent } from './microsoft/microsoft.component';
import { WopiApiComponent } from './wopi-api/wopi-api.component';
import { AboutComponent } from './about/about.component';
import { ExcelComponent } from './microsoft/excel/excel.component';
import { CalenderComponent } from './microsoft/calender/calender.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'google', component: GoogleComponent },
  { path: 'microsoft', component: MicrosoftComponent,
    children: [
      { path: 'msExcel', component: ExcelComponent },
      { path: 'calender', component: CalenderComponent }
    ]
   },
  { path: 'wopi', component: WopiApiComponent },
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
