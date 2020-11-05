import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Layout/layout.component';
import { AuthorizedGuard } from './Util/authorize.guard';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LayoutComponent,
        canActivate: [],
        children: [
            {
                path: '',
                canLoad: [],
                loadChildren: './Components/admin-login/admin-login#AdminLoginModule'
            }
        ]
    },
    {
        path: 'changepassword',
        component: LayoutComponent,
        canActivate: [AuthorizedGuard],
        children: [
            {
                path: '',
                canLoad: [AuthorizedGuard],
                loadChildren: './Components/change-password/change-password#ChangePasswordModule'
            }
        ]
    },
    {
        path: 'customermanagement',
        component: LayoutComponent,
        canActivate: [AuthorizedGuard],
        children: [
            {
                path: '',
                canLoad: [AuthorizedGuard],
                loadChildren: './Components/customer-management/customer-management#CustomerManagementModule'
            }
        ]
    },
    {
        path: 'detail',
        component: LayoutComponent,
        canActivate: [AuthorizedGuard],
        children: [
            {
                path: '',
                canLoad: [AuthorizedGuard],
                loadChildren: './Components/customer-detail/customer-detail#CustomerDetailModule'
            }
        ]
    },
    {
        path: 'recipes',
        component: LayoutComponent,
        canActivate: [AuthorizedGuard],
        children: [
            {
                path: '',
                canLoad: [AuthorizedGuard],
                loadChildren: './Components/recipes-management/recipes-management#RecipesManagementModule'
            }
        ]
    },
    {
        path: 'recipesDetail',
        component: LayoutComponent,
        canActivate: [AuthorizedGuard],
        children: [
            {
                path: '',
                canLoad: [AuthorizedGuard],
                loadChildren: './Components/recipes-detail/recipes-detail#RecipeDetailModule'
            }
        ]
    },
    {
        path: 'recipesPreview',
        component: LayoutComponent,
        canActivate: [AuthorizedGuard],
        children: [
            {
                path: '',
                canLoad: [AuthorizedGuard],
                loadChildren: './Components/recipes-preview/recipes-preview#RecipesPreviewModule'
            }
        ]
    },
    {
        path: 'addrecipes',
        component: LayoutComponent,
        canActivate: [AuthorizedGuard],
        children: [
            {
                path: '',
                canLoad: [AuthorizedGuard],
                loadChildren: './Components/add-recipes/add-recipes#AddRecipeModule'
            }
        ]
    },
    {
        path: 'order',
        component: LayoutComponent,
        canActivate: [AuthorizedGuard],
        children: [
            {
                path: '',
                canLoad: [AuthorizedGuard],
                loadChildren: './Components/order-management/order-management#OrderMangementModule'
            }
        ]
    },
    {
        path: 'orderdetail',
        component: LayoutComponent,
        canActivate: [AuthorizedGuard],
        children: [
            {
                path: '',
                canLoad: [AuthorizedGuard],
                loadChildren: './Components/order-detail/order-detail#OrderDetailModule'
            }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
const appRouting = RouterModule.forRoot(appRoutes, { useHash: true });

@NgModule({
    imports: [
        appRouting
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
