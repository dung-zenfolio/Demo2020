import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesCustomComponent } from '../datatable-custom/datatable-custom.component';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DataTablesCustomComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    DataTablesCustomComponent
  ],
})
export class CommonsModule { }
