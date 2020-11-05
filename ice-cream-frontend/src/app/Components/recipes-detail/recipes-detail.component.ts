import { Component } from '@angular/core';
import { RecipeDetailService } from './recipes-detail.service';
import { ActivatedRoute } from '@angular/router';
import { RecipesModel } from '../../models/recipesModel';
import { AlertType } from '../../models/alertModel';
import { AlertService } from '../../Service/alert.service';
import { NavigationService } from '../../Service/navigation.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: 'recipes-detail.component.html',
    styleUrls: ['recipes-detail.component.css'],
    providers: [RecipeDetailService]
})
export class RecipesDetailComponent {
    private paramSub: any;
    recipeModel: RecipesModel = new RecipesModel();

    constructor (private activeRoute: ActivatedRoute,
        private service: RecipeDetailService,
        private alert: AlertService,
        private navService: NavigationService) {
        this.paramSub = this.activeRoute.params.subscribe(params => {
            const id = params['id'];
            if (id > 0) {
                this.service.getRecipeDetailById(id, (result) => {
                    if (result.Success) {
                        this.recipeModel = result.Result;
                        if (this.recipeModel.Image) {
                            this.recipeModel.FileName = this.recipeModel.Image.replace('images/', '');
                        }
                    } else {
                        this.alert.show('Can not load recipe. Please contact admin.', AlertType.Error);
                    }
                });
            }
        });
    }

    returnRecipeList() {
        this.navService.RecipeManage();
    }

    changeFile(event: any) {
        const files = event.srcElement.files;
        this.recipeModel.Image = 'images/' + files[0].name;
        this.recipeModel.FileName = this.recipeModel.Image.replace('images/', '');
    }

    changeStatus(value: any) {
        this.recipeModel.EnableStatus = value.target.checked;
    }

    updateRecipe() {
        this.service.updateRecipe(this.recipeModel, (result) => {
            if (result.Success) {
                this.alert.show('Update recipe successfull');
            } else {
                this.alert.show('Update recipe unsuccessfull', AlertType.Error);
            }
        });
    }
}
