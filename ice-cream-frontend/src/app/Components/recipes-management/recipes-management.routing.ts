import { RouterModule, Routes } from '@angular/router';
import { RecipesManagementComponent } from './recipes-management.component';

const recipesManageRoutes: Routes = [
    {
        path: '',
        component: RecipesManagementComponent,
    }
];
export const recipesManageRouting = RouterModule.forChild(recipesManageRoutes);
