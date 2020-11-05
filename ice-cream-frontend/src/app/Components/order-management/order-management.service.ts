import { Injectable } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { OrderManageUrl } from './urls';

@Injectable()
export class OrderService {
    constructor (private api: ApiService) {}

    getAllOrders(callback: (data: any) => any) {
        return this.api.get(OrderManageUrl.getOrders(), callback);
    }
}
