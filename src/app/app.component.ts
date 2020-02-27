import { Component, HostListener, Inject } from '@angular/core';
import { GlobalServiceService } from './globalServices/global-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  preserveWhitespaces:true
})
export class AppComponent {
  title = 'Practice                 2020';
  @HostListener('click',['$event'])
  onhostclick(event:Event){
    console.log('Event  : ',event)
  }
  constructor(@Inject(GlobalServiceService) globalService){
    console.log("Global Service : ",globalService)
  }
}
