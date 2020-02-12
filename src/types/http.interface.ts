import {HttpRequestConfig} from './http-request-config.class';
import {Observable} from "rxjs/internal/Observable";
import {HttpRequestConfigurations} from './http-configurations.enum';
import {HttpResponse} from "./http-response.class";

export interface IHttp {
    get(url: HttpRequestConfigurations, config?: HttpRequestConfig): Observable<HttpResponse>;
    post(url: HttpRequestConfigurations, config: HttpRequestConfig): Observable<HttpResponse>;
    put(url: HttpRequestConfigurations, config: HttpRequestConfig): Observable<HttpResponse>;
    patch(url: HttpRequestConfigurations, config: HttpRequestConfig): Observable<HttpResponse>;
    delete(url: HttpRequestConfigurations, config: HttpRequestConfig): Observable<HttpResponse>;
}
