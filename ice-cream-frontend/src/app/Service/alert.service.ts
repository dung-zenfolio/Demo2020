import { Injectable, OnInit } from '@angular/core';
import { AlertType } from '../models/alertModel';

@Injectable()
export class AlertService {
    alertComponent: {display: boolean, message: string, type: AlertType};
    constructor () {
    }

    Init(alertCom: {display: boolean, message: string, type: AlertType} ) {
        this.alertComponent = alertCom;
    }

    show(message: string, type: AlertType = AlertType.Success) {
        this.alertComponent.display = true;
        this.alertComponent.message = message;
        this.alertComponent.type = type;

        setTimeout(() => {
            this.alertComponent.display = false;
        }, 4000);
    }

    close() {
        this.alertComponent.display = false;
    }
}
