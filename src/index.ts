import 'whatwg-fetch';
import { RequestMapper } from './mappers/request.mapper';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, tap } from 'rxjs/operators';
import { HttpRequestConfig } from './types/http-request-config.class';
import { IHttp } from './types/http.interface';
import { HttpRequestConfigurations } from './types/http-configurations.enum';
import { IHttpInterceptor } from './types/http-interceptor.interface';
import { HttpInterceptors } from './types/http-interceptors.class';
import { HttpRequest } from './types/http-request.class';
import { HttpResponse } from './types/http-response.class';

export class RxJSHttpClient implements IHttp {
    private readonly _requestInterceptors: HttpInterceptors<HttpRequest>;
    private readonly _responseInterceptors: HttpInterceptors<HttpResponse>;

    constructor(requestInterceptors: Array<IHttpInterceptor<HttpRequest>> = [],
                responseInterceptors: Array<IHttpInterceptor<HttpResponse>> = []) {
        this._requestInterceptors = new HttpInterceptors<HttpRequest>(requestInterceptors);
        this._responseInterceptors = new HttpInterceptors<HttpResponse>(responseInterceptors);
    }

    public get(url: string, config: Partial<HttpRequestConfig> = {}): Observable<HttpResponse> {
        const request = this._requestInterceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.GET);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map((response) => this._responseInterceptors.execute(new HttpResponse(response))),
                tap((response) => {
                    if (!response.ok) {
                        throw response;
                    }
                })
            );
    }

    public post(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        const request = this._requestInterceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.POST);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map((response) => this._responseInterceptors.execute(new HttpResponse(response))),
                tap((response) => {
                    if (!response.ok) {
                        throw response;
                    }
                })
            );
    }

    public put(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        const request = this._requestInterceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.PUT);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map((response) => this._responseInterceptors.execute(new HttpResponse(response))),
                tap((response) => {
                    if (!response.ok) {
                        throw response;
                    }
                })
            );
    }

    public patch(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        const request = this._requestInterceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.PATCH);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map((response) => this._responseInterceptors.execute(new HttpResponse(response))),
                tap((response) => {
                    if (!response.ok) {
                        throw response;
                    }
                })
            );
    }

    public delete(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        const request = this._requestInterceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.DELETE);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map((response) => this._responseInterceptors.execute(new HttpResponse(response))),
                tap((response) => {
                    if (!response.ok) {
                        throw response;
                    }
                })
            );
    }
}
