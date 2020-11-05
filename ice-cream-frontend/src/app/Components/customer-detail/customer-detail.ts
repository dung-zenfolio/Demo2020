import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailComponent } from './customer-detail.component';
import { CommonsModule } from '../common/common.module';
import { FormsModule} from '@angular/forms';
import { customerDetailRouting } from './customer-detail.routing';

@NgModule({
    declarations: [CustomerDetailComponent],
    imports: [customerDetailRouting, CommonsModule, FormsModule, CommonModule]
})
export class CustomerDetailModule {}
