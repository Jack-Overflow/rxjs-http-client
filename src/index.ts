import {HttpRequestConfig} from "./types/http-request-config.class";
import {IHttp} from "./types/http.interface";
import {HttpConfigFactory} from "./factories/http-config.factory";
import {HttpRequestMapper} from "./mappers/http-request.mapper";

import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";

export class RxJSHttpClient implements IHttp {

    public get(url: string, config: HttpRequestConfig = {}): Observable<any> {
        const requestConfig: HttpRequestConfig = HttpConfigFactory.getHttpGetConfigFor(config);
        const configObject: RequestInit = HttpRequestMapper.mapRequestInitFor(requestConfig);

        return fromPromise(
            fetch(url, configObject)
                .then((res) => res.json()))
            .pipe(catchError((error) => of(error)));
    }

    public post(url: string, config: HttpRequestConfig = {}): Observable<any> {
        const requestConfig: HttpRequestConfig = HttpConfigFactory.getHttpPostConfigFor(config);
        const configObject: RequestInit = HttpRequestMapper.mapRequestInitFor(requestConfig);

        return fromPromise(
            fetch(url, configObject)
                .then((res) => res.json()))
            .pipe(catchError((error) => of(error)));
    }

    public put(url: string, config: HttpRequestConfig = {}): Observable<any> {
        const requestConfig: HttpRequestConfig = HttpConfigFactory.getHttpPutConfigFor(config);
        const configObject: RequestInit = HttpRequestMapper.mapRequestInitFor(requestConfig);

        return fromPromise(
            fetch(url, configObject)
                .then((res) => res.json()))
            .pipe(catchError((error) => of(error)));
    }
}
