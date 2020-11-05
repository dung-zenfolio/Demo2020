import { Injectable } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { DetailUrl } from './urls';

@Injectable()
export class DetailService {
    constructor (private api: ApiService) {}

    getCustomerById(id: number, callback: (data: any) => any) {
        return this.api.get(DetailUrl.getCustomerById(id.toString()), callback);
    }

    updateCustomerDetail(data: any, callback: (data: any) => any) {
        return this.api.post(DetailUrl.updateCustomerDetail(), callback, data);
    }
}
