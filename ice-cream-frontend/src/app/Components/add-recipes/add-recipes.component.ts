import { Component } from '@angular/core';
import { RecipesModel } from '../../models/recipesModel';

@Component({
    selector: 'app-add-recipes',
    templateUrl: 'add-recipes.component.html',
    styleUrls: ['add-recipes.component.css']
})
export class AddRecipesComponent {
    recipeModel: RecipesModel = new RecipesModel();
    preview = false;
    constructor () {
    }

    changeFile(event: any) {
        const files = event.srcElement.files;
        this.recipeModel.Image = 'images/' + files[0].name;
    }

    changeStatus(value: any) {
        this.recipeModel.EnableStatus = value.target.checked;
    }

    openPreview() {
        this.preview = true;
    }

    backEdit() {
        this.preview = false;
    }

    clearInfo() {
        this.recipeModel = new RecipesModel();
    }
}
