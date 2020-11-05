import { Constant } from '../../Constant/constant';

export class OrderDetailUrls {
    constructor () {}

    static getOrderById() {
        return Constant.apiUrl + 'api/order/GetOrderById/';
    }

    static updateOrder() {
        return Constant.apiUrl + 'api/order/UpdateOrder';
    }
}
