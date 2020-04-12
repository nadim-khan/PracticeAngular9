import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../globalServices/alerts.service';
import { Alert } from '../globalServices/alerts';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

   constructor(private alertsService: AlertsService) {
    }

  ngOnInit() {
  }

  close(alert: Alert) {
    this.alertsService.remove(alert);
  }

}
