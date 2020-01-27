import 'whatwg-fetch';
import {RequestMapper} from './mappers/request.mapper';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from "rxjs/operators";
import {ResponseMapper} from "./mappers/response.mapper";
import {HttpRequestConfig} from "./types/http-request-config.class";
import {IHttp} from "./types/http.interface";
import {HttpRequestConfigurations} from "./types/http-configurations.enum";
import {IHttpResponse} from "./types/http-response.interface";
import {IHttpInterceptor} from "./types/IHttpInterceptor";
import {HttpInterceptors} from "./types/http-interceptors.class";
import {HttpRequest} from "./types/http-request.class";

export class RxJSHttpClient implements IHttp {
    private readonly _interceptors: HttpInterceptors;

    constructor(interceptors: Array<IHttpInterceptor> = []) {
        this._interceptors = new HttpInterceptors(interceptors);
    }

    public get(url: string, config: Partial<HttpRequestConfig> = {}): Observable<IHttpResponse> {
        const request = this._interceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.GET);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map(ResponseMapper.map)
            );
    }

    public post(url: string, config: Partial<HttpRequestConfig>): Observable<IHttpResponse> {
        const request = this._interceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.POST);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map(ResponseMapper.map)
            );
    }

    public put(url: string, config: Partial<HttpRequestConfig>): Observable<IHttpResponse> {
        const request = this._interceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.PUT);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map(ResponseMapper.map)
            );
    }

    public patch(url: string, config: Partial<HttpRequestConfig>): Observable<IHttpResponse> {
        const request = this._interceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.PATCH);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map(ResponseMapper.map)
            );
    }

    public delete(url: string, config: Partial<HttpRequestConfig>): Observable<IHttpResponse> {
        const request = this._interceptors.execute(new HttpRequest(url, config));
        const configObject: RequestInit = RequestMapper.for(request, HttpRequestConfigurations.DELETE);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map(ResponseMapper.map)
            );
    }
}
