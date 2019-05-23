import { HttpRequestConfig } from "./types/http-request-config.class";
import { IHttp } from "./types/http.interface";
import { Observable } from "rxjs";
export declare class RxJSHttpClient implements IHttp {
    get(url: string, config?: HttpRequestConfig): Observable<any>;
    post(url: string, config?: HttpRequestConfig): Observable<any>;
    put(url: string, config?: HttpRequestConfig): Observable<any>;
    patch(url: string, config?: HttpRequestConfig): Observable<any>;
    delete(url: string, config?: HttpRequestConfig): Observable<any>;
}
//# sourceMappingURL=index.d.ts.map