import { Constant } from '../../Constant/constant';

export class AddRecipeUrl {
    constructor () {}
    static getRecipeById() {
        return Constant.apiUrl + 'api/recipes/GetRecipeById/';
    }

    static updateRecipe() {
        return Constant.apiUrl + 'api/recipes/UpdateRecipe';
    }

    static addRecipe() {
        return Constant.apiUrl + 'api/recipes/AddRecipe';
    }
}
