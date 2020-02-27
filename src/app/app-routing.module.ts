import { CompanyInfoComponent } from './company/company-info/company-info.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { CompanyComponent } from './company/company.component';
import { CompanyAboutUsComponent } from './company/company-about-us/company-about-us.component';
import { CompanyFAQComponent } from './company/company-faq/company-faq.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'employee',component:EmployeeComponent
  },
  {path:'company',
  children:[
    {path:'companyInfo',component:CompanyInfoComponent},
    {path:'aboutUs',component:CompanyAboutUsComponent},
    {path:'companyFAQ',component:CompanyFAQComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
