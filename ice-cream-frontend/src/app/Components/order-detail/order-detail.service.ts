import { Injectable } from '@angular/core';
import { OrderDetailUrls } from './urls';
import { ApiService } from '../../Service/api.service';

@Injectable()
export class OrderDetailService {
    constructor (private api: ApiService) {}

    getOrderById(data: any, callback: (data: any) => any) {
        return this.api.get(OrderDetailUrls.getOrderById() + data, callback);
    }

    updateOrder(data: any, callback: (data: any) => any) {
        return this.api.post(OrderDetailUrls.updateOrder(), callback, data);
    }
}
