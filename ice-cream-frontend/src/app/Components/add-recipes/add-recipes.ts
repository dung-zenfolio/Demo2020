import { NgModule } from '@angular/core';
import { AddRecipesComponent } from './add-recipes.component';
import { AddRecipeRouting } from './add-recipes.routing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
    imports: [AddRecipeRouting, CommonModule, FormsModule],
    declarations: [AddRecipesComponent, PreviewComponent],
    providers: []
})
export class AddRecipeModule {}
