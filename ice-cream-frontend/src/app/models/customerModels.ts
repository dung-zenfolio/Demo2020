export class CustomerModel {
    ID: number;
    UserName: string;
    FullName: string;
    Email: string;
    ExpireDate: Date;
    Enabled: boolean;
    Detail: string;
    PhoneNumber: string;
    Gender: boolean;
    Birthday: Date;
    Address: string;

    constructor() {
        this.ID = 0;
        this.UserName = '';
        this.FullName = '';
        this.Email = '';
        this.ExpireDate = new Date();
        this.Enabled = false;
        this.Detail = '';
    }
}
