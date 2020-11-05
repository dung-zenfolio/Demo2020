import { NgModule } from '@angular/core';
import { CustomerManagementComponent } from './customer-management.component';
import { customerRouting } from './customer-management.routing';
import { CommonsModule } from '../common/common.module';
import { FormsModule} from '@angular/forms';

@NgModule({
    declarations: [CustomerManagementComponent],
    imports: [customerRouting, CommonsModule, FormsModule]
})
export class CustomerManagementModule {}
