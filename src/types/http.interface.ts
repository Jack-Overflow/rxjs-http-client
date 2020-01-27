import {HttpRequestConfig} from './http-request-config.class';
import {Observable} from "rxjs/internal/Observable";
import {HttpRequestConfigurations} from './http-configurations.enum';

export interface IHttp {
    get(url: HttpRequestConfigurations, config?: HttpRequestConfig): Observable<any>;
    post(url: HttpRequestConfigurations, config: HttpRequestConfig): Observable<any>;
    put(url: HttpRequestConfigurations, config: HttpRequestConfig): Observable<any>;
    patch(url: HttpRequestConfigurations, config: HttpRequestConfig): Observable<any>;
    delete(url: HttpRequestConfigurations, config: HttpRequestConfig): Observable<any>;
}
