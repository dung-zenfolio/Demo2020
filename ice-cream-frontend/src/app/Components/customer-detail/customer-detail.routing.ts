import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail.component';

const customerDetailRoutes: Routes = [
    {
        path: ':id',
        component: CustomerDetailComponent,
    }
];
export const customerDetailRouting = RouterModule.forChild(customerDetailRoutes);
