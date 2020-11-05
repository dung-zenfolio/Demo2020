import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from './customer-detail.service';
import { CustomerModel } from '../../models/customerModels';
import { AlertService } from '../../Service/alert.service';
import { AlertType } from '../../models/alertModel';

@Component ({
    selector: 'app-customer-detail',
    templateUrl: 'customer-detail.component.html',
    styleUrls: ['customer-detail.component.css'],
    providers: [DetailService]
})
export class CustomerDetailComponent {
    readonly paramSub: any;
    customerModel: CustomerModel = new CustomerModel();

    constructor (private activeRoute: ActivatedRoute,
        private serivce: DetailService,
        private alert: AlertService) {
        this.paramSub = this.activeRoute.params.subscribe(params => {
            const id = params['id'];
            if (id > 0) {
                this.serivce.getCustomerById(id, (result) => {
                    if (result.Success) {
                        this.customerModel = result.Result;
                    } else {
                        this.alert.show('Can not load customer. Please contact admin.', AlertType.Error);
                    }
                });
            }
        });
    }

    changeExpireDate(value: number) {
        if (value > 0) {
            const date = new Date(this.customerModel.ExpireDate);
            date.setDate(date.getDate() + parseInt(value.toString()));
            this.customerModel.ExpireDate = date;
        }
    }

    updateCustomer() {
        if (this.customerModel) {
            this.serivce.updateCustomerDetail(this.customerModel, (result) => {
                if (result.Success) {
                    this.alert.show('Update customer successfull');
                    this.customerModel = result.Result;
                } else {
                    this.alert.show('Update customer unsuccessfull. Please contact admin', AlertType.Error);
                }
            });
        }
    }

    changeEnable(value: number) {
        this.customerModel.Enabled = parseInt(value.toString()) === 1 ? true : false;
    }
}
