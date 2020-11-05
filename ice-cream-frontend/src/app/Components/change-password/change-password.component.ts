import { Component } from '@angular/core';
import { AccountService } from '../../Service/account.service';
import { AlertService } from '../../Service/alert.service';
import { AlertType } from 'src/app/models/alertModel';

@Component({
    selector: 'app-change-password',
    templateUrl: 'change-password.html',
    styleUrls: ['change-password.css']
})
export class ChangePasswordComponent {
    userModel = {newPass: '', rePass: '', oldPass: ''};
    constructor(private accountService: AccountService,
        private alert: AlertService) {
    }

    validateForm() {
        if (!this.userModel.newPass) {
            this.alert.show('Please enter new password', AlertType.Error);
            return false;
        }

        if (!this.userModel.rePass) {
            this.alert.show('Please enter re-type password', AlertType.Error);
            return false;
        }

        if (!this.userModel.oldPass) {
            this.alert.show('Please enter old password', AlertType.Error);
            return false;
        }

        return true;
    }

    changePass() {
        if (this.validateForm()) {
            if (this.userModel.newPass === this.userModel.rePass) {
                this.accountService.changePassword(this.userModel.newPass, this.userModel.oldPass);
            } else {
                this.alert.show('Re-type password is not correct', AlertType.Error);
            }
        }
    }

    clearForm () {
        this.userModel.newPass = '';
        this.userModel.rePass = '';
        this.userModel.oldPass = '';
    }
}
