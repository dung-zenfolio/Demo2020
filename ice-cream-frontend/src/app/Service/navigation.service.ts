import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
    constructor(private readonly router: Router) {
    }

    ChangePassword(): void {
        this.router.navigate(['/changepassword']);
    }

    CustomerManagement(): void {
        this.router.navigate(['/customermanagement']);
    }

    Login(): void {
        this.router.navigate(['/login']);
    }

    RecipeManage(): void {
        this.router.navigate(['/recipes']);
    }

    AddRecipe(): void {
        this.router.navigate(['/addrecipes']);
    }
}
