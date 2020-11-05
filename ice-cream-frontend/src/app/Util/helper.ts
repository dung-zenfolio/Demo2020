import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class Helper {
    renderFormatDateTime(data: any, type: any, row: any, meta: any) {
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(data, 'dd/MM/yyyy');
    }

    renderDetail(data: any, type: any, row: any, meta: any) {
        return '<a href="#/detail/' + row.ID + '"><img src="assets/images/user_edit.png" ></a>';
    }

    formatDateTime(date: Date) {
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(date, 'dd/MM/yyyy');
    }

    renderImageRecipes(data: any, type: any, row: any, meta: any) {
        return '<img src="assets/' + data + '" style="width: 100px; height: 100px;" >';
    }

    renderRecipeLink(data: any, type: any, row: any, meta: any) {
        return '<a href="#/recipesDetail/' + row.ID + '" >Edit</a>&nbsp;<a href="#/recipesPreview/' + row.ID + '" > Preview </a>' ;
    }

    renderDetailOrder(data: any, type: any, row: any, meta: any) {
        return '<a href="#/orderdetail/' + row.ID + '" > Details </a>' ;
    }

    renderStatus(data: any, type: any, row: any, meta: any) {
        if (data === false) {
            return 'Processing';
        } else {
            return 'Completed';
        }
    }
}
