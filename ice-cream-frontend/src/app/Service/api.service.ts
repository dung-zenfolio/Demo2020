import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, SubscribableOrPromise } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { forkJoin } from 'rxjs';
import 'rxjs/add/observable/empty';
import { NavigationService } from './navigation.service';
import { AlertService } from './alert.service';
import { AlertType } from '../models/alertModel';
// import { MessageService } from './message.service';
@Injectable()
export class ApiServiceFactory {
    constructor(private http: HttpClient,
        private _loadingService: LoadingService,
        private _navigationService: NavigationService,
        private _alertService: AlertService) { }

    create(): ApiService {
        return new ApiService(this.http, this._loadingService, this._navigationService, this._alertService);
    }
}

@Injectable()
export class ApiService {
    showLoading = true;
    private _delayLoading = 0;

    constructor(private http: HttpClient, private _loadingService: LoadingService,
        private _navService: NavigationService,
        private _alertService: AlertService) { }

    public get delayLoading() {
        return this._loadingService.delay;
    }

    public set delayLoading(value: number) {
        this._loadingService.delay = value;
    }

    get<R>(url: string, success?: (data: any) => void, params?: any, errorResult?: R): Observable<R>  {
        if (success) {
            this.showLoadingScreen();
        }

        const obs = this.request<R>('GET', url, params, errorResult, !!success);

        if (success) {
            obs.subscribe((result: R) => { this.hideLoadingScreen(); this.handleResult(result, success); });
        }

        return obs;
    }

    post<R>(url: string, success?: (data: any) => void, body?: any, errorResult?: R): Observable<R> {
        if (success) {
            this.showLoadingScreen();
        }

        const obs = this.request<R>('POST', url, body, errorResult, !!success);

        if (success) {
            obs.subscribe((result: R) => { this.hideLoadingScreen(); this.handleResult(result, success); });
        }

        return obs;
    }

    put<R>(url: string, success?: (data: any) => void, body?: any, errorResult?: R): Observable<R> {
        if (success) {
            this.showLoadingScreen();
        }

        const obs = this.request<R>('PUT', url, body, errorResult, !!success);

        if (success) {
            obs.subscribe((result: R) => { this.hideLoadingScreen(); this.handleResult(result, success); });
        }

        return obs;
    }

    delete<R>(url: string, success?: (data: any) => void, body?: any, errorResult?: R): Observable<R> {
        if (success) {
            this.showLoadingScreen();
        }

        const obs = this.request<R>('DELETE', url, body, errorResult, !!success);

        if (success) {
            obs.subscribe((result: R) => { this.hideLoadingScreen(); this.handleResult(result, success); });
        }

        return obs;
    }

    request<R>(method: string, url: string, body?: any, errorResult?: R, hideLoadingIfAnyErrors = false): Observable<R> {
        method = method ? method.toUpperCase() : method;
        const headers: any = {};

        if (url.indexOf('/token') >= 0) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            //headers['No-Auth'] = 'True';
        }

        if (localStorage.getItem('userToken')) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('userToken').replace('"', '');
        }

        return this.http.request<R>(method, url, method === 'GET' ?
        {
            withCredentials: false,
            params: body,
            headers: headers
        } :
        {
            withCredentials: false,
            body: body,
            headers: headers
        }).pipe(
            catchError(this.handleError<R>(errorResult, hideLoadingIfAnyErrors))
        );
    }

    public downloadRequest(url: string, fileName: string, success?: (data: any) => void, params?: any): Observable<Blob> {
        const request = this.downloadResource(url, params);

        request.subscribe((result: any) => {
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(result, fileName);
            } else {
                const temp_url = window.URL.createObjectURL(result);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(temp_url);
                a.remove();
            }

            if (success) { success(result); }
        });

        return request;
    }

    public downloadResource(url: string, params?: any): Observable<Blob> {
        const headers: any = {};

        return this.http.request<Blob>('POST', url,
            {
                body: params,
                withCredentials: true,
                responseType: 'blob' as 'json',
                headers: headers
            });
    }

    requestMany(...sources: SubscribableOrPromise<any>[]): Observable<any[]> {
        return forkJoin(sources);
    }

    handleSuccess<R>(result: R, success: (data: any) => void, hideLoading = false) {
        this.handleResult(result, success, hideLoading);
    }

    handleError<R>(result?: R, hideLoadingIfAnyErrors = false) {
        return (error: any): Observable<R> => {

            let returnVal;

            if (error.status === 401 && error.statusText === 'Unauthorized') {
                localStorage.removeItem('userToken');
                this._navService.Login();
                returnVal = Observable.empty();
                this.hideLoadingScreen();
            } else {
                localStorage.removeItem('userToken');
                this.hideLoadingScreen();
                this._alertService.show(error.error.error_description, AlertType.Error);
            }

            if (hideLoadingIfAnyErrors) {
                this.hideLoadingScreen();
            }

            return returnVal;
        };
    }

    private handleResult<R>(result: any, success: (data: any) => void, hideLoading = false): void {
        if (this.validateResultAndRedirect(result)) {
            success(result);
        }

        if (hideLoading) {
            this.hideLoadingScreen();
        }
    }

    private validateResultAndRedirect(result: any) {
        /*if (result.RequirePermission && result.Error === '#REDIRECT_CONTACT_ADMIN') {
            this._navService.unauthorized();
            return false;
        } else if (result.RequirePermission && result.Error === '#REDIRECT_UNAUTHORIZED_PAGE') {
            this._navService.unauthorizedpage();
            return false;
        } else if (result.RequirePermission && result.Error === '#REDIRECT_PAGE_NOT_FOUND') {
            this._navService.notFound();
            return false;
        } else if (!result.Succeed && result.Error) {
            this._msgService.showError([result.Error]);
            return false;
        }*/

        return true;
    }

    showLoadingScreen() {
        if (this.showLoading) {
            this._loadingService.show();
        }
    }

    hideLoadingScreen() {
        if (this.showLoading) {
            this._loadingService.hide();
        }
    }
}
