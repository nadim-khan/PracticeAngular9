import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { GraphService } from '../graph.service';
import { Event, DateTimeTimeZone } from '../event';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  private events: Event[];

  constructor(
    private graphService: GraphService) {
      this.refresh();
     }

  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.graphService.getEvents()
      .then((events) => {
        this.events = events;
      });
  }

  formatDateTimeTimeZone(dateTime: DateTimeTimeZone): string {
    try {
      return moment.tz(dateTime.dateTime, dateTime.timeZone).format();
    } catch (error) {
      // this.alertsService.add('DateTimeTimeZone conversion error', JSON.stringify(error));
    }
  }

}



