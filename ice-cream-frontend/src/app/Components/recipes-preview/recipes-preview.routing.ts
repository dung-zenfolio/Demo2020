import { RouterModule, Routes } from '@angular/router';
import { RecipePreviewComponent } from './recipes-preview.component';

const recipesPreviewRoutes: Routes = [
    {
        path: ':id',
        component: RecipePreviewComponent,
    }
];
export const recipesPreviewRouting = RouterModule.forChild(recipesPreviewRoutes);
