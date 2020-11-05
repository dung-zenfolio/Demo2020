import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password.component';

const changePasswordRoutes: Routes = [
    {
        path: '',
        component: ChangePasswordComponent,
    }
];
export const changePasswordRouting = RouterModule.forChild(changePasswordRoutes);
