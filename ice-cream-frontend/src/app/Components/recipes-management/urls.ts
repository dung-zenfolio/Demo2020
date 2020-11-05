import { Constant } from '../../Constant/constant';

export class RecipesUrl {
    constructor () {}

    static getAllRecipes() {
        return Constant.apiUrl + 'api/recipes/GetAllRecipes';
    }
}
