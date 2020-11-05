export class RecipesModel {
    ID: number;
    Name: string;
    Image: string;
    Description: string;
    Details: string;
    Author: string;
    ViewNumber: string;
    UploadDate: Date;
    EnableStatus: boolean;
    EditPreview: string;
    FileName: string;

    constructor() {
        this.UploadDate = new Date();
    }
}
