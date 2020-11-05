import { Component } from '@angular/core';
import { OrderDetailService } from './order-detail.service';
import { OrderModel } from '../../models/orderModel';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../Service/alert.service';
import { AlertType } from 'src/app/models/alertModel';

@Component({
    selector: 'app-order-detail',
    templateUrl: 'order-detail.component.html',
    styleUrls: ['order-detail.component.css'],
    providers: [OrderDetailService]
})
export class OrderDetailComponent {
    orderModel: OrderModel = new OrderModel();
    private paramSub: any;
    constructor (private activeRoute: ActivatedRoute,
        private service: OrderDetailService,
        private alert: AlertService) {
        this.paramSub = this.activeRoute.params.subscribe(params => {
            const id = params['id'];
            if (id > 0) {
                this.service.getOrderById(id, (result) => {
                    if (result.Success) {
                        this.orderModel = result.Result;
                    } else {
                        this.alert.show('Can not load order. Please contact admin.', AlertType.Error);
                    }
                });
            }
        });
    }

    changeStatus(value: number) {
        this.orderModel.Status = parseInt(value.toString()) === 1 ? true : false;
    }

    updateOrder() {
        this.service.updateOrder(this.orderModel, (result) => {
            if (result.Success) {
                this.alert.show('Update order successfull');
            } else {
                this.alert.show('Failed to update. Please contact admin.', AlertType.Error);
            }
        });
    }
}
