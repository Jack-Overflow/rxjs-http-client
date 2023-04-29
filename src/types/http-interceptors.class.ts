import {IHttpInterceptor} from './http-interceptor.interface';
import {from, last, Observable, of, switchScan} from 'rxjs';

export class HttpInterceptors<T> {
    private readonly _interceptors: Array<IHttpInterceptor<T>>;

    constructor(interceptors: Array<IHttpInterceptor<T>>) {
        this._interceptors = interceptors;
    }

    public execute(data: T): Observable<T> {
        if (this._interceptors.length > 0) {
            return from(this._interceptors)
                .pipe(
                    switchScan((a, b) => b.intercept(a), data),
                    last()
                );
        }

        return of(data);
    }
}
