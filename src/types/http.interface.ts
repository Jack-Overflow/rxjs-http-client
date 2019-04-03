import {HttpRequestConfig} from "./http-request-config.class";
import {Observable} from "rxjs";

export interface IHttp {
    get(url: string, config: HttpRequestConfig): Observable<any>;
    post(url: string, config: HttpRequestConfig): Observable<any>;
    put(url: string, config: HttpRequestConfig): Observable<any>;
}
