import { Component } from '@angular/core';
import { NavigationService } from '../../Service/navigation.service';
import { AccountService } from '../../Service/account.service';
import { AlertService } from '../../Service/alert.service';
import { AlertType } from '../../models/alertModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../../Constant/constant';

@Component({
    selector: 'app-admin-login',
    templateUrl: 'admin-login.html',
    styleUrls: ['admin-login.css']
})
export class AdminLoginComponent {
    username = 'admin';
    password = 'admin';

    constructor(private navigateService: NavigationService,
        private accountService: AccountService,
        private alertService: AlertService,
        private http: HttpClient) {
            this.accountService.userInfo = null;
            localStorage.removeItem('userToken');
        }

    login() {
        if (this.username && this.password) {
            this.accountService.getTokenInfo(this.username, this.password, (result) => {
                this.navigateService.CustomerManagement();
            });
        }
    }

    changePassword() {
        this.navigateService.ChangePassword();
    }
}
