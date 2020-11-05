import { Component } from '@angular/core';
import { RecipePreviewService } from './recipes-preview.service';
import { ActivatedRoute } from '@angular/router';
import { RecipesModel } from '../../models/recipesModel';
import { AlertType } from '../../models/alertModel';
import { AlertService } from '../../Service/alert.service';
import { NavigationService } from '../../Service/navigation.service';

@Component({
    selector: 'app-recipe-preview',
    templateUrl: 'recipes-preview.component.html',
    styleUrls: ['recipes-preview.component.css'],
    providers: [RecipePreviewService]
})
export class RecipePreviewComponent {
    private paramSub: any;
    recipeModel: RecipesModel;

    constructor (private service: RecipePreviewService,
        private activeRoute: ActivatedRoute,
        private alert: AlertService,
        private navService: NavigationService) {
            this.paramSub = this.activeRoute.params.subscribe(params => {
                const id = params['id'];
                if (id > 0) {
                    this.service.getRecipeDetailById(id, (result) => {
                        if (result.Success) {
                            this.recipeModel = result.Result;
                        } else {
                            this.alert.show('Can not load recipe. Please contact admin.', AlertType.Error);
                        }
                    });
                }
            });
    }
}
