import { Constant } from '../../Constant/constant';

export class RecipeDetailUrl {
    constructor () {}
    static getRecipeById() {
        return Constant.apiUrl + 'api/recipes/GetRecipeById/';
    }

    static updateRecipe() {
        return Constant.apiUrl + 'api/recipes/UpdateRecipe';
    }
}
