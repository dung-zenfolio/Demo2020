import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChangePasswordComponent } from './change-password.component';
import { changePasswordRouting } from './change-password.routing';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ changePasswordRouting, FormsModule, CommonModule ],
    declarations: [ ChangePasswordComponent ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChangePasswordModule {}
