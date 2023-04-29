import {Observable} from 'rxjs';

export interface IHttpInterceptor<T> {
    intercept(data: T): Observable<T>;
}
