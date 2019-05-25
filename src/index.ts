import {RxjsHttpRequestConfig} from "./types/http-request-config.class";
import {IHttp} from "./types/http.interface";
import {HttpRequestMapper} from "./mappers/http-request.mapper";

import {Observable} from "rxjs";
import {HttpRequestConfigurationsEnum} from "./types/http-configurations.enum";

export class RxJSHttpClient implements IHttp {

    public get(url: string, config: Partial<RxjsHttpRequestConfig> = {}): Observable<Response> {
        const configObject: RequestInit = HttpRequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.GET);

        return new Observable((observable) => {
            fetch(url, configObject)
                .then((res: Response) => {
                    observable.next(res)
                })
                .catch((err) => {
                    observable.error(err)
                })
            })
    }

    public post(url: string, config: RxjsHttpRequestConfig = {}): Observable<Response> {
        const configObject: RequestInit = HttpRequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.POST);

        return new Observable((observable) => {
            fetch(url, configObject)
                .then((response: Response) => {
                    observable.next(response);
                })
                .catch((err) => {
                    observable.error(err)
                })
        })
    }

    public put(url: string, config: RxjsHttpRequestConfig = {}): Observable<Response> {
        const configObject: RequestInit = HttpRequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.PUT);

        return new Observable((observable) => {
            fetch(url, configObject)
                .then((response: Response) => {
                    observable.next(response)
                })
                .catch((error) => {
                    observable.error(error)
                })
        })
    }

    public patch(url: string, config: RxjsHttpRequestConfig = {}): Observable<Response> {
        const configObject: RequestInit = HttpRequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.PATCH);

        return new Observable((observable) => {
            fetch(url, configObject)
                .then((response: Response) => {
                    observable.next(response)
                })
                .catch((error) => {
                    observable.error(error)
                })
        })
    }

    public delete(url: string, config: RxjsHttpRequestConfig = {}): Observable<Response> {
        const configObject: RequestInit = HttpRequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.DELETE);

        return new Observable((observable) => {
            fetch(url, configObject)
                .then((response: Response) => {
                    observable.next(response)
                })
                .catch((error) => {
                    observable.error(error)
                })
        })
    }
}
