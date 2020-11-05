import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderManagementComponent } from './order-management.component';
import { OrderManageRouting } from './order-management.routing';
import { CommonsModule } from '../common/common.module';

@NgModule({
    imports: [FormsModule, CommonModule, OrderManageRouting, CommonsModule],
    declarations: [OrderManagementComponent],
    providers: []
})
export class OrderMangementModule {}
