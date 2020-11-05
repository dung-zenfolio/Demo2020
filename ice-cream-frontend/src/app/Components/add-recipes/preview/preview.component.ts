import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecipesModel } from '../../../models/recipesModel';
import { RecipeDetailService } from '../add-recipes.service';
import { AlertService } from '../../../Service/alert.service';
import { NavigationService } from '../../../Service/navigation.service';
import { AlertType } from 'src/app/models/alertModel';

@Component({
    selector: 'app-preview',
    templateUrl: 'preview.component.html',
    styleUrls: ['preview.component.css'],
    providers: [RecipeDetailService]
})
export class PreviewComponent {
    @Input() recipeModel: RecipesModel;
    @Output() backEdit: EventEmitter<any> = new EventEmitter<any>();
    constructor (private recipeService: RecipeDetailService,
        private alert: AlertService,
        private navService: NavigationService) {
    }

    returnEdit() {
        this.backEdit.emit();
    }

    updateRecipe() {
        if (this.recipeModel.Name) {
            this.recipeService.addRecipe(this.recipeModel, (result) => {
                if (result.Success) {
                    this.alert.show('Add new recipe successfull');
                    this.navService.RecipeManage();
                } else {
                    this.alert.show('Add new recipe unsuccessfull', AlertType.Error);
                }
            });
        }
    }
}
