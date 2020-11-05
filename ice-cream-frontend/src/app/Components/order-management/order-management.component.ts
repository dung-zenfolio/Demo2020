import { Component } from '@angular/core';
import { DataTableCustomOption, DataTableCustomColumn} from '../datatable-custom/datatable-custom.models';
import { OrderModel } from '../../models/orderModel';
import { OrderService } from './order-management.service';
import { Helper } from '../../Util/helper';

@Component({
    selector: 'app-order',
    templateUrl: 'order-management.component.html',
    styleUrls: ['order-management.component.css'],
    providers: [OrderService]
})
export class OrderManagementComponent {
    datatableOptions: DataTableCustomOption;
    orderModel: Array<OrderModel> = new Array<OrderModel>();
    constructor (private service: OrderService,
        private helper: Helper) {
        this.service.getAllOrders((result) => {
            if (result.Success) {
                this.orderModel = result.Result;
            }
        });
    }

    buildDatatableOption() {
        this.datatableOptions = new DataTableCustomOption();
        this.datatableOptions.dataSource = this.orderModel;
        this.datatableOptions.DisplayLength = 20;
        this.datatableOptions.Paging = true;
        this.datatableOptions.ServerSide = false;
        this.datatableOptions.CanSelectAll = (() => false);
        this.datatableOptions.Columns = [
            new DataTableCustomColumn({
                ColumnName: 'ID',
                PropertyName: 'ID',
                width: '5%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Buyer',
                PropertyName: 'Name',
                width: '10%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Email',
                PropertyName: 'Email',
                width: '15%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Contact',
                PropertyName: 'Contact',
                width: '10%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Address',
                PropertyName: 'Address',
                width: '10%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Book Cost',
                PropertyName: 'BookCost',
                width: '10%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Paying Option',
                PropertyName: 'PayingOption',
                width: '15%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Order Date',
                PropertyName: 'OrderDate',
                width: '10%',
                RenderFunction: this.helper.renderFormatDateTime
            }),
            new DataTableCustomColumn({
                ColumnName: 'Status',
                PropertyName: 'Status',
                width: '10%',
                RenderFunction: this.helper.renderStatus
            }),
            new DataTableCustomColumn({
                ColumnName: 'Process',
                PropertyName: 'Detail',
                width: '5%',
                RenderFunction: this.helper.renderDetailOrder
            }),
        ];

        return this.datatableOptions;
    }
}
