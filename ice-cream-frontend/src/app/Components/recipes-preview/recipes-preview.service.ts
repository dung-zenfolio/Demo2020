import { Injectable } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { RecipePreviewUrl } from './urls';

@Injectable()
export class RecipePreviewService {
    constructor (private service: ApiService) {}

    getRecipeDetailById(id: any, callback: (data: any) => any) {
        return this.service.get(RecipePreviewUrl.getRecipeById() + id, callback);
    }
}
