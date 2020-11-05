import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminLoginComponent } from './admin-login.component';
import { adminRouting } from './admin-login.routing';
import { FormsModule} from '@angular/forms';

@NgModule({
    declarations: [AdminLoginComponent],
    imports: [adminRouting, FormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminLoginModule {}


