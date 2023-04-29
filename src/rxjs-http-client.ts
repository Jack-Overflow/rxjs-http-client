import {from, map, mergeMap, Observable} from 'rxjs';
import {RequestMapper} from './mappers/request.mapper';
import {checkHttpStatus} from './operators/check-http-status.operator';
import {HttpRequestConfigurations} from './types/http-configurations.enum';
import {IHttpInterceptor} from './types/http-interceptor.interface';
import {HttpInterceptors} from './types/http-interceptors.class';
import {HttpRequestConfig} from './types/http-request-config.class';
import {HttpRequest} from './types/http-request.class';
import {HttpResponse} from './types/http-response.class';
import {IHttp} from './types/http.interface';

export class RxJSHttpClient implements IHttp {
    private readonly _reqInterceptors: HttpInterceptors<HttpRequest>;
    private readonly _resInterceptors: HttpInterceptors<HttpResponse>;

    constructor(reqInterceptors: IHttpInterceptor<HttpRequest>[] = [], resInterceptors: IHttpInterceptor<HttpResponse>[] = []) {
        this._reqInterceptors = new HttpInterceptors<HttpRequest>(reqInterceptors);
        this._resInterceptors = new HttpInterceptors<HttpResponse>(resInterceptors);
    }

    public get(url: string, config: Partial<HttpRequestConfig> = {}): Observable<HttpResponse> {
        return this._reqInterceptors.execute(new HttpRequest(url, config))
            .pipe(
                map((request) => RequestMapper.for(request, HttpRequestConfigurations.GET)),
                mergeMap((configObject) => from(fetch(url, configObject))),
                map((response) => new HttpResponse(response.body, {
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText
                })),
                mergeMap((response) => this._resInterceptors.execute(response)),
                checkHttpStatus()
            );
    }

    public post(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        return this._reqInterceptors.execute(new HttpRequest(url, config))
            .pipe(
                map((request) => RequestMapper.for(request, HttpRequestConfigurations.POST)),
                mergeMap((configObject) => from(fetch(url, configObject))),
                map((response) => new HttpResponse(response.body, {
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText
                })),
                mergeMap((response) => this._resInterceptors.execute(response)),
                checkHttpStatus()
            );
    }

    public put(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        return this._reqInterceptors.execute(new HttpRequest(url, config))
            .pipe(
                map((request) => RequestMapper.for(request, HttpRequestConfigurations.PUT)),
                mergeMap((configObject) => from(fetch(url, configObject))),
                map((response) => new HttpResponse(response.body, {
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText
                })),
                mergeMap((response) => this._resInterceptors.execute(response)),
                checkHttpStatus()
            );
    }

    public patch(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        return this._reqInterceptors.execute(new HttpRequest(url, config))
            .pipe(
                map((request) => RequestMapper.for(request, HttpRequestConfigurations.PATCH)),
                mergeMap((configObject) => from(fetch(url, configObject))),
                map((response) => new HttpResponse(response.body, {
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText
                })),
                mergeMap((response) => this._resInterceptors.execute(response)),
                checkHttpStatus()
            );
    }

    public delete(url: string, config: Partial<HttpRequestConfig>): Observable<HttpResponse> {
        return this._reqInterceptors.execute(new HttpRequest(url, config))
            .pipe(
                map((request) => RequestMapper.for(request, HttpRequestConfigurations.DELETE)),
                mergeMap((configObject) => from(fetch(url, configObject))),
                map((response) => new HttpResponse(response.body, {
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText
                })),
                mergeMap((response) => this._resInterceptors.execute(response)),
                checkHttpStatus()
            );
    }
}
