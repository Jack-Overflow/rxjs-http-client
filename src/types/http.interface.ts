import {HttpRequestConfig} from './http-request-config.class';
import {Observable} from "rxjs/internal/Observable";
import {HttpRequestConfigurationsEnum} from './http-configurations.enum';

export interface IHttp {
    get(url: HttpRequestConfigurationsEnum, config?: HttpRequestConfig): Observable<any>;
    post(url: HttpRequestConfigurationsEnum, config: HttpRequestConfig): Observable<any>;
    put(url: HttpRequestConfigurationsEnum, config: HttpRequestConfig): Observable<any>;
    patch(url: HttpRequestConfigurationsEnum, config: HttpRequestConfig): Observable<any>;
    delete(url: HttpRequestConfigurationsEnum, config: HttpRequestConfig): Observable<any>;
}
