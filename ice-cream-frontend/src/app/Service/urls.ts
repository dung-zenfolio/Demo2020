import { Constant } from '../Constant/constant';

export class GetUrls {
    constructor () {}

    static getUserInfo() {
        return Constant.apiUrl + 'api/account/GetClaimUser';
    }

    static getToken() {
        return Constant.apiUrl + 'token';
    }

    static changePassword() {
        return Constant.apiUrl + 'api/account/ChangePassword';
    }
}
