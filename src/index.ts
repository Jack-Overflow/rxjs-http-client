import 'whatwg-fetch';
import {RxjsHttpRequestConfig} from './types/http-request-config.class';
import {IHttp} from './types/http.interface';
import {RequestMapper} from './mappers/request.mapper';
import {Observable} from 'rxjs';
import {HttpRequestConfigurationsEnum} from './types/http-configurations.enum';
import {fromPromise} from 'rxjs/internal-compatibility';

export class RxJSHttpClient implements IHttp {

    public get(url: string, config: Partial<RxjsHttpRequestConfig> = {}): Observable<any> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.GET);

        return fromPromise(fetch(url, configObject)
            .then((res: Response) => res.json())
        );
    }

    public post(url: string, config: Partial<RxjsHttpRequestConfig>): Observable<any> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.POST);

        return fromPromise(fetch(url, configObject)
            .then((res: Response) => res.json())
        );
    }

    public put(url: string, config: Partial<RxjsHttpRequestConfig>): Observable<any> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.PUT);

        return fromPromise(fetch(url, configObject)
            .then((res: Response) => res.json())
        );
    }

    public patch(url: string, config: Partial<RxjsHttpRequestConfig>): Observable<any> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.PATCH);

        return fromPromise(fetch(url, configObject)
            .then((res: Response) => res.json())
        );
    }

    public delete(url: string, config: Partial<RxjsHttpRequestConfig>): Observable<any> {
        const configObject: RequestInit = RequestMapper.mapRequestInitFor(config, HttpRequestConfigurationsEnum.DELETE);

        return fromPromise(fetch(url, configObject)
            .then((res: Response) => res.json())
        );
    }
}
