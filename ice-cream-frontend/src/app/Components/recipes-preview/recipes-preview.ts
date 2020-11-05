import { NgModule } from '@angular/core';
import { recipesPreviewRouting } from './recipes-preview.routing';
import { RecipePreviewComponent } from './recipes-preview.component';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@NgModule({
    imports: [recipesPreviewRouting, CommonModule, FormsModule],
    declarations: [RecipePreviewComponent],
    providers: []
})
export class RecipesPreviewModule {
}
