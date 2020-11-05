import { Injectable } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { AddRecipeUrl } from './urls';

@Injectable()
export class RecipeDetailService {
    constructor (private service: ApiService) {}

    getRecipeDetailById(id: any, callback: (data: any) => any) {
        return this.service.get(AddRecipeUrl.getRecipeById() + id, callback);
    }

    updateRecipe(data: any, callback: (data: any) => any) {
        return this.service.post(AddRecipeUrl.updateRecipe(), callback, data);
    }

    addRecipe(data: any, callback: (data: any) => any) {
        return this.service.post(AddRecipeUrl.addRecipe(), callback, data);
    }
}
