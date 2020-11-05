import { Component } from '@angular/core';
import { AlertService } from '../../Service/alert.service';
import { AlertType } from 'src/app/models/alertModel';

@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent {
    type: AlertType;
    message: string;
    display = false;

    constructor(private alertService: AlertService) {
        this.alertService.Init(this);
    }

    show(message: string, type: AlertType = AlertType.Success) {
        if (!this.display) {
            this.type = type;
            this.message = message;
            this.display = true;

            setTimeout(() => {
                this.close();
            }, 3000);
        }
    }

    close() {
        if (this.display) {
            this.display = false;
            this.message = '';
            this.type = AlertType.Success;
        }
    }

    showStrongMessage() {
        switch (this.type) {
            case AlertType.Success:
                return 'Success! ';
            case AlertType.Warning:
                return 'Warning! ';
            case AlertType.Error:
                return 'Error! ';
        }
    }
}

