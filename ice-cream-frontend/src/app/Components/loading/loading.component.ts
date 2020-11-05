import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoadingService } from '../../Service/loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.css']
})
export class LoadingComponent implements OnInit, AfterViewInit {
    display = false;
    modalAnimation = false;
    constructor(private readonly _loadingService: LoadingService) {
    }

    ngOnInit() {
        this._loadingService.init(this);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (!this.modalAnimation) {
                this.modalAnimation = true;
            }
        }, 150);
    }
}
