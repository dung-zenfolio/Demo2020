import { Constant } from '../../Constant/constant';

export class CustomerUrl {
    constructor() {
    }

    static getCustomerAll() {
        return Constant.apiUrl + 'api/Customer/getcustomer';
    }

    static updateCustomerEnable() {
        return Constant.apiUrl + 'api/Customer/EnableCustomer';
    }
}
