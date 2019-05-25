import {RxjsHttpRequestConfig} from "./http-request-config.class";
import {Observable} from "rxjs";
import {HttpRequestConfigurationsEnum} from "./http-configurations.enum";

export interface IHttp {
    get(url: HttpRequestConfigurationsEnum, config: RxjsHttpRequestConfig): Observable<any>;
    post(url: HttpRequestConfigurationsEnum, config: RxjsHttpRequestConfig): Observable<any>;
    put(url: HttpRequestConfigurationsEnum, config: RxjsHttpRequestConfig): Observable<any>;
    patch(url: HttpRequestConfigurationsEnum, config: RxjsHttpRequestConfig): Observable<any>;
    delete(url: HttpRequestConfigurationsEnum, config: RxjsHttpRequestConfig): Observable<any>;
}
