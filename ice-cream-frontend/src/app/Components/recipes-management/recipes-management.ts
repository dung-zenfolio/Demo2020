import { NgModule } from '@angular/core';
import { recipesManageRouting } from './recipes-management.routing';
import { RecipesManagementComponent } from './recipes-management.component';
import { CommonsModule } from '../common/common.module';

@NgModule ({
    imports: [recipesManageRouting, CommonsModule],
    declarations: [RecipesManagementComponent],
    providers: []
})
export class RecipesManagementModule {
}
