import 'whatwg-fetch';
import {RxjsHttpRequestConfig} from './types/http-request-config.class';
import {IHttp} from './types/http.interface';
import {RequestMapper} from './mappers/request.mapper';
import {Observable, throwError} from 'rxjs';
import {HttpRequestConfigurationsEnum} from './types/http-configurations.enum';
import {fromPromise} from 'rxjs/internal-compatibility';
import {catchError} from 'rxjs/operators';

export class RxJSHttpClient implements IHttp {

    public get(url: string, config: Partial<RxjsHttpRequestConfig> = {}): Observable<any> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.GET);

        return fromPromise(fetch(url, configObject)
            .then((res: Response) => res.json()))
            .pipe(catchError((err) => throwError(err)));
    }

    public post(url: string, config: Partial<RxjsHttpRequestConfig>): Observable<any> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.POST);

        return fromPromise(fetch(url, configObject)
            .then((res: Response) => res.json()))
            .pipe(catchError((err) => throwError(err)));
    }

    public put(url: string, config: Partial<RxjsHttpRequestConfig>): Observable<any> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.PUT);

        return fromPromise(fetch(url, configObject)
            .then((res: Response) => res.json()))
            .pipe(catchError((err) => throwError(err)));
    }

    public patch(url: string, config: Partial<RxjsHttpRequestConfig>): Observable<any> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.PATCH);

        return fromPromise(fetch(url, configObject)
            .then((res: Response) => res.json()))
            .pipe(catchError((err) => throwError(err)));
    }

    public delete(url: string, config: Partial<RxjsHttpRequestConfig>): Observable<any> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.DELETE);

        return fromPromise(fetch(url, configObject)
            .then((res: Response) => res.json()))
            .pipe(catchError((err) => throwError(err)));
    }
}
