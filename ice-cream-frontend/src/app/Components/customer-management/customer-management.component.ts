import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../models/customerModels';
import { DataTableCustomOption, DataTableCustomColumn, ControlEdit, AlignColumn } from '../datatable-custom/datatable-custom.models';
import { CustomerService } from './customer.service';
import { Helper } from '../../Util/helper';
import { AlertService } from '../../Service/alert.service';
import { AlertType } from 'src/app/models/alertModel';

@Component({
    selector: 'app-customer-management',
    styleUrls: ['customer-management.css'],
    templateUrl: 'customer-management.html',
    providers: [CustomerService]
})
export class CustomerManagementComponent implements OnInit {
    userfind = '';
    customers: Array<CustomerModel> = new Array<CustomerModel>();
    customersFilter: Array<CustomerModel> = new Array<CustomerModel>();
    datatableOptions: DataTableCustomOption;
    private dataChanges: Array<CustomerModel> = new Array<CustomerModel>();
    constructor(private customerService: CustomerService,
        private helper: Helper,
        private alertService: AlertService) {
        this.customerService.getCustomers((data) => {
            this.customers = data.Result;
            this.customersFilter = data.Result;
        });
    }

    buildDatatableOption() {
        this.datatableOptions = new DataTableCustomOption();
        this.datatableOptions.dataSource = this.customersFilter;
        this.datatableOptions.Paging = true;
        this.datatableOptions.ServerSide = false;
        this.datatableOptions.CanSelectAll = (() => false);
        this.datatableOptions.DisplayLength = 10;
        this.datatableOptions.Columns = [
            new DataTableCustomColumn({
                ColumnName: 'ID',
                PropertyName: 'ID',
                width: '5%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Username',
                PropertyName: 'UserName',
                width: '25%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Full name',
                PropertyName: 'FullName',
                width: '30%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Email',
                PropertyName: 'Email',
                width: '20%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Exprie date',
                PropertyName: 'ExpireDate',
                width: '10%',
                RenderFunction: this.helper.renderFormatDateTime
            }),
            new DataTableCustomColumn({
                ColumnName: 'Enable',
                PropertyName: 'Enabled',
                width: '5%',
                ControlEdit: ControlEdit.Checkbox,
                isControl: true,
            }),
            new DataTableCustomColumn({
                ColumnName: 'Detail',
                PropertyName: 'Detail',
                width: '5%',
                RenderFunction: this.helper.renderDetail,
                TextAlign: AlignColumn.Center
            }),
        ];

        return this.datatableOptions;
    }

    ngOnInit() {
    }

    findUsername() {
        if (this.userfind) {
            this.customersFilter = this.customers.filter(x => x.UserName.indexOf(this.userfind) >= 0);
        } else {
            this.customersFilter = this.customers;
        }
    }

    getDataChange(data: CustomerModel) {
        if (data) {
            this.dataChanges.push(data);
        }
    }

    UpdateCustomerEnabled() {
        if (this.dataChanges.length > 0) {
            this.customerService.updateCustomerEnable(this.dataChanges, (data) => {
                if (data.Success) {
                    this.alertService.show('Update customer successfully');
                } else {
                    this.alertService.show('Update customer failed. Please contact admin.', AlertType.Error);
                }
            });
        }
    }
}


