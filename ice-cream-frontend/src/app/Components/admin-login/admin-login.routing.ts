import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login.component';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminLoginComponent,
    }
];
export const adminRouting = RouterModule.forChild(adminRoutes);
