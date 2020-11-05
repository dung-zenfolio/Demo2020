import { Constant } from '../../Constant/constant';

export class RecipePreviewUrl {
    constructor () {}
    static getRecipeById() {
        return Constant.apiUrl + 'api/recipes/GetRecipeById/';
    }
}
