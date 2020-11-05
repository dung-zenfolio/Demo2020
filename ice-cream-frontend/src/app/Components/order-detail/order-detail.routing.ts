import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail.component';

const orderDetailRoutes: Routes = [
    {
        path: ':id',
        component: OrderDetailComponent,
    }
];
export const OrderDetailRouting = RouterModule.forChild(orderDetailRoutes);
