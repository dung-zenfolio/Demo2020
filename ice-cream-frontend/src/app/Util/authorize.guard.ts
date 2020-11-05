import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    CanLoad,
    Route
} from '@angular/router';
import { AccountService } from '../Service/account.service';
import { NavigationService } from '../Service/navigation.service';

@Injectable()
export class AuthorizedGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private router: Router,
        private location: Location,
        private accountService: AccountService,
        private nagService: NavigationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!localStorage.getItem("userToken")) {
            return false;
        }

        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canDo();
    }

    canLoad(route: Route): boolean {
        return this.canDo();
    }

    private canDo(): boolean {
        if (!localStorage.getItem("userToken")) {
            this.nagService.Login();
            return false;
        } else {
            this.accountService.getUserInfo((result) => {});
        }

        // wait for currentUser available
        return true;
    }
}
