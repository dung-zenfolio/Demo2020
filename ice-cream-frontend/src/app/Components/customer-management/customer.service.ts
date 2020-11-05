import { Injectable } from '@angular/core';
import { CustomerUrl } from './urls';
import { ApiService } from '../../Service/api.service';

@Injectable()
export class CustomerService {
    constructor(private apiService: ApiService) {
    }

    getCustomers(callback: (result: any) => any) {
        return this.apiService.get(CustomerUrl.getCustomerAll(), callback);
    }

    updateCustomerEnable(data: any, callback: (result: any) => any) {
        return this.apiService.post(CustomerUrl.updateCustomerEnable(), callback, data);
    }
}
