import { RouterModule, Routes } from '@angular/router';
import { OrderManagementComponent } from './order-management.component';

const orderManageRoutes: Routes = [
    {
        path: '',
        component: OrderManagementComponent,
    }
];
export const OrderManageRouting = RouterModule.forChild(orderManageRoutes);
