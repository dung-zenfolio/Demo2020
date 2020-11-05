import { RouterModule, Routes } from '@angular/router';
import { AddRecipesComponent } from './add-recipes.component';

const addRecipeRoutes: Routes = [
    {
        path: '',
        component: AddRecipesComponent,
    }
];
export const AddRecipeRouting = RouterModule.forChild(addRecipeRoutes);
