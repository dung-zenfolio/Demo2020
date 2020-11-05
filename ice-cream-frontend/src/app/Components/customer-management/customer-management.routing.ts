import { RouterModule, Routes } from '@angular/router';
import { CustomerManagementComponent } from './customer-management.component';

const customerRoutes: Routes = [
    {
        path: '',
        component: CustomerManagementComponent,
    }
];
export const customerRouting = RouterModule.forChild(customerRoutes);
