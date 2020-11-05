import { RouterModule, Routes } from '@angular/router';
import { RecipesDetailComponent } from './recipes-detail.component';

const recipesDetailRoutes: Routes = [
    {
        path: ':id',
        component: RecipesDetailComponent,
    }
];
export const recipesDetailRouting = RouterModule.forChild(recipesDetailRoutes);
