import { Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';
import { GetUrls } from './urls';
import { ApiService } from './api.service';
import { AlertService } from './alert.service';
import { AlertType } from '../models/alertModel';

@Injectable()
export class AccountService {
    userInfo: UserModel;
    token: string;

    constructor (private apiService: ApiService,
        private alertService: AlertService) {
    }

    getUserInfo(callback: (data: any) => void) {
        if (!this.userInfo) {
            this.apiService.get(GetUrls.getUserInfo(), (data) => {
                if (data.Success) {
                    this.userInfo = data.Result;
                } else {
                    this.userInfo = null;
                }

                callback(this.userInfo);
            });
        }
    }

    getTokenInfo(username: string, pass: string, callback: (data: any) => any) {
        if (!this.userInfo) {
            const data = 'username=' + username + '&password=' + pass + '&grant_type=password';
            this.apiService.post(GetUrls.getToken(), (result) => {
                localStorage.setItem('userToken', result.access_token);
                this.token = result.access_token;
                this.userInfo = result.user_info;
                callback(result.access_token);
            }, data);
        }
    }

    changePassword(newPass: string, oldPass: string) {
        if (newPass && this.userInfo) {
            this.apiService.post(GetUrls.changePassword(), (result: any) => {
                if (result.Success) {
                    this.alertService.show('Change password successfull.');
                } else {
                    this.alertService.show('Change password unsuccessfull', AlertType.Error);
                }
            }, {Username: this.userInfo.Username, Password: newPass, OldPassword: oldPass});
        }
    }
}
