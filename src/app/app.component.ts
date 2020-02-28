import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { GlobalServiceService } from './globalServices/global-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  preserveWhitespaces:true
})
export class AppComponent implements OnInit {
  title = 'Practice 2020';
  languages;
  @HostListener('click',['$event'])
  onhostclick(event:Event){
    console.log('Event  : ',event);
    
  }
  constructor(private globalService: GlobalServiceService){
  }
  ngOnInit(){
    this.languages= this.globalService.languages;
  }
}