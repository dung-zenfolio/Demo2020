import { NgModule } from '@angular/core';
import { recipesDetailRouting } from './recipes-detail.routing';
import { RecipesDetailComponent } from './recipes-detail.component';
import { CommonsModule } from '../common/common.module';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@NgModule({
    imports: [recipesDetailRouting, CommonsModule, CommonModule, FormsModule],
    declarations: [RecipesDetailComponent],
    providers: []
})
export class RecipeDetailModule {
}
