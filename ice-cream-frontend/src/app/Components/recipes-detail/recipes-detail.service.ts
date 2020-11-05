import { Injectable } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { RecipeDetailUrl } from './urls';

@Injectable()
export class RecipeDetailService {
    constructor (private service: ApiService) {}

    getRecipeDetailById(id: any, callback: (data: any) => any) {
        return this.service.get(RecipeDetailUrl.getRecipeById() + id, callback);
    }

    updateRecipe(data: any, callback: (data: any) => any) {
        return this.service.post(RecipeDetailUrl.updateRecipe(), callback, data);
    }
}
