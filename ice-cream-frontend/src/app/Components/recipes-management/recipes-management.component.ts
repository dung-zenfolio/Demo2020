import { Component } from '@angular/core';
import { RecipesService } from './recipes-management.service';
import { RecipesModel } from '../../models/recipesModel';
import { DataTableCustomOption, DataTableCustomColumn, ControlEdit } from '../datatable-custom/datatable-custom.models';
import { Helper } from '../../Util/helper';
import { NavigationService } from '../../Service/navigation.service';

@Component({
    selector: 'app-recipes',
    templateUrl: 'recipes-management.component.html',
    styleUrls: ['recipes-management.component.css'],
    providers: [RecipesService]
})
export class RecipesManagementComponent {
    recipesModel: RecipesModel = new RecipesModel();
    datatableOptions: DataTableCustomOption;
    constructor (private recipesService: RecipesService,
        private helper: Helper,
        private navService: NavigationService) {
        this.recipesService.getAllRecipes((result) => {
            if (result.Success) {
                this.recipesModel = result.Result;
            }
        });
    }

    buildDatatableOption() {
        this.datatableOptions = new DataTableCustomOption();
        this.datatableOptions.dataSource = this.recipesModel;
        this.datatableOptions.DisplayLength = 10;
        this.datatableOptions.Paging = true;
        this.datatableOptions.ServerSide = false;
        this.datatableOptions.CanSelectAll = (() => false);
        this.datatableOptions.Columns = [
            new DataTableCustomColumn({
                ColumnName: 'ID',
                PropertyName: 'ID',
                width: '5%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Name',
                PropertyName: 'Name',
                width: '10%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Image',
                PropertyName: 'Image',
                width: '35%',
                RenderFunction: this.helper.renderImageRecipes
            }),
            new DataTableCustomColumn({
                ColumnName: 'Author',
                PropertyName: 'Author',
                width: '10%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'View Number',
                PropertyName: 'ViewNumber',
                width: '10%'
            }),
            new DataTableCustomColumn({
                ColumnName: 'Upload Date',
                PropertyName: 'UploadDate',
                width: '10%',
                RenderFunction: this.helper.renderFormatDateTime
            }),
            new DataTableCustomColumn({
                ColumnName: 'Enable Status',
                PropertyName: 'EnableStatus',
                width: '10%',
                ControlEdit: ControlEdit.Checkbox,
                isControl: true
            }),
            new DataTableCustomColumn({
                ColumnName: 'Edit / Preview',
                PropertyName: 'EditPreview',
                width: '10%',
                RenderFunction: this.helper.renderRecipeLink
            }),
        ];

        return this.datatableOptions;
    }

    addNewRecipe() {
        this.navService.AddRecipe();
    }
}
