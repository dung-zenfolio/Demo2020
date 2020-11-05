import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LayoutComponent } from './Layout/layout.component';
import { AuthorizedGuard } from './Util/authorize.guard';
import { LoadingService } from './Service/loading.service';
import { LoadingComponent } from './Components/loading/loading.component';
import { ApiService, ApiServiceFactory } from './Service/api.service';
import { NavigationService } from './Service/navigation.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Helper } from './Util/helper';
import { AlertService } from './Service/alert.service';
import { AlertComponent } from './Components/alert/alert.component';
import { AccountService } from './Service/account.service';
import { CustomerDetailModule } from './Components/customer-detail/customer-detail';
import { RecipesManagementModule } from './Components/recipes-management/recipes-management';
import { RecipeDetailModule } from './Components/recipes-detail/recipes-detail';
import { RecipesPreviewModule } from './Components/recipes-preview/recipes-preview';
import { AddRecipeModule } from './Components/add-recipes/add-recipes';
import { OrderMangementModule } from './Components/order-management/order-management';
import { OrderDetailModule } from './Components/order-detail/order-detail';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    LayoutComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    CustomerDetailModule,
    RecipesManagementModule,
    RecipeDetailModule,
    RecipesPreviewModule,
    AddRecipeModule,
    OrderMangementModule,
    OrderDetailModule
  ],
  providers: [AuthorizedGuard,
    LoadingService,
    ApiService,
    ApiServiceFactory,
    NavigationService,
    Helper,
    AlertService,
    AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
