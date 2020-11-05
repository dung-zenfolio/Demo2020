import { Constant } from '../../Constant/constant';

export class DetailUrl {
    constructor () {}

    static getCustomerById(id: string) {
        return Constant.apiUrl + 'api/Customer/GetCustomerDetail/' + id;
    }

    static updateCustomerDetail() {
        return Constant.apiUrl + 'api/Customer/UpdateDetail';
    }
}
