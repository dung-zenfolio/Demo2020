import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
    private static loadingCount = 0;
    private _uiComponent: { display: boolean };
    private _showingTimeout: any;
    public delay = 0;

    init(uiComponent: { display: boolean }) {
        this._uiComponent = uiComponent;
    }

    show() {
        LoadingService.loadingCount++;
        this.refresh();
    }

    hide() {
        if (LoadingService.loadingCount > 0) {
            LoadingService.loadingCount--;
        }
        this.refresh();
    }

    private refresh() {
        if (this._uiComponent) {
            if (this.delay > 0) {
                if (this._showingTimeout) {
                    clearTimeout(this._showingTimeout);
                }

                this._showingTimeout = setTimeout(() => {
                    this._uiComponent.display = LoadingService.loadingCount > 0;
                    this._showingTimeout = null;
                }, 400);
            } else {
                this._uiComponent.display = LoadingService.loadingCount > 0;
            }
        }
    }
}
