import { Injectable } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { RecipesUrl } from './urls';

@Injectable()
export class RecipesService {
    constructor (private api: ApiService) {}

    getAllRecipes(callback: (data: any) => any) {
        return this.api.get(RecipesUrl.getAllRecipes(), callback);
    }
}
