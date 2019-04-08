import { Component } from '@angular/core';
import { AlertService } from './alert.service';
import { Alert, AlertType } from './alert';
import { timeout } from 'q';

@Component({
    selector: 'cv-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})
export class AlertComponent {

    alerts: Alert[] = [];
    timeout = 3000;

    constructor(private alertService: AlertService) {

        alertService.
            getAlert().
            subscribe(alert => {
                if (!alert) {
                    this.alerts = [];
                }
                this.alerts.push(alert);
                setTimeout(() => this.removerAlert(alert), this.timeout);
            })
    }

    removerAlert(alertToRemove) {
        this.alerts = this.alerts.filter(alert => alert != alertToRemove);
    }

    getAlertClass(alert: Alert){

        if(!alert) return '';

        switch (alert.alertType){
            
            case AlertType.SUCCESS:
                return 'alert alert-success';
        }
    }
}