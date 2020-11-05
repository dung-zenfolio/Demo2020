import { Constant } from '../../Constant/constant';

export class OrderManageUrl {
    constructor () {}

    static getOrders() {
        return Constant.apiUrl + 'api/order/GetAll';
    }
}
