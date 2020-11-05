import { Component, OnChanges } from '@angular/core';
import { AccountService } from '../Service/account.service';
import { NavigationService } from '../Service/navigation.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'my-app',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css']
})

export class LayoutComponent implements OnChanges {
    displayLogOut = false;
    constructor(private accountService: AccountService,
        private nagService: NavigationService) {
        if (!localStorage.getItem('userToken')) {
            this.displayLogOut = false;
        } else {
            this.displayLogOut = true;
        }
    }
    ngOnChanges(changes: any) {
    }

    logOut() {
        localStorage.removeItem('userToken');
        this.accountService.userInfo = null;
        this.displayLogOut = false;
        this.nagService.Login();
    }
}
