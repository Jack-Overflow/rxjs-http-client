import 'whatwg-fetch';
import {RequestMapper} from './mappers/request.mapper';
import {Observable} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from "rxjs/operators";
import {ResponseMapper} from "./mappers/response.mapper";
import {HttpRequestConfig} from "./types/http-request-config.class";
import {IHttp} from "./types/http.interface";
import {HttpRequestConfigurationsEnum} from "./types/http-configurations.enum";
import {IHttpResponse} from "./types/http-response.interface";

export class RxJSHttpClient implements IHttp {

    public get(url: string, config: Partial<HttpRequestConfig> = {}): Observable<IHttpResponse> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.GET);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map(ResponseMapper.map)
            );
    }

    public post(url: string, config: Partial<HttpRequestConfig>): Observable<IHttpResponse> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.POST);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map(ResponseMapper.map)
            );
    }

    public put(url: string, config: Partial<HttpRequestConfig>): Observable<IHttpResponse> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.PUT);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map(ResponseMapper.map)
            );
    }

    public patch(url: string, config: Partial<HttpRequestConfig>): Observable<IHttpResponse> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.PATCH);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map(ResponseMapper.map)
            );
    }

    public delete(url: string, config: Partial<HttpRequestConfig>): Observable<IHttpResponse> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.DELETE);

        return fromPromise(fetch(url, configObject))
            .pipe(
                map(ResponseMapper.map)
            );
    }
}
