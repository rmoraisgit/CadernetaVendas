import { Injectable, ɵConsole } from '@angular/core';
import { Subject } from 'rxjs';

import { Alert, AlertType } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSubject: Subject<Alert> = new Subject<Alert>();

  success(message: string) {
    this.alert(AlertType.SUCCESS, message);
  }

  private alert(alertType: AlertType, message: string) {
    this.alertSubject.next(new Alert(alertType, message));
  }

  getAlert(){
    return this.alertSubject.asObservable();
  }
}