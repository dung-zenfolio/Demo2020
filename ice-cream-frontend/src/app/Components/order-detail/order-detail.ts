import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './order-detail.component';
import { OrderDetailRouting } from './order-detail.routing';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@NgModule({
    imports: [OrderDetailRouting, CommonModule, FormsModule],
    declarations: [OrderDetailComponent],
    providers: []
})
export class OrderDetailModule {}
