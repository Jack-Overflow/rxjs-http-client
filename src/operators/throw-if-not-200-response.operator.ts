import {mergeMap, Observable, of, OperatorFunction, throwError} from 'rxjs';
import {HttpResponse} from '../types/http-response.class';

export function throwIfNot200Response(): OperatorFunction<HttpResponse, HttpResponse> {
    return function (source: Observable<HttpResponse>): Observable<HttpResponse> {
        return source.pipe(
            mergeMap((res) => res.ok ? of(res) : throwError(() => res))
        );
    };
}
