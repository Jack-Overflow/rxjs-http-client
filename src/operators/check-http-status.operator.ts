import { concatMap, Observable, of, OperatorFunction, throwError } from 'rxjs';
import { HttpResponse } from '../types/http-response.class';

export function checkHttpStatus(): OperatorFunction<HttpResponse, HttpResponse> {
  return function(source: Observable<HttpResponse>): Observable<HttpResponse> {
    return source.pipe(
      concatMap(res => {
        return res.ok
          ? of(res)
          : throwError(() => res);
      })
    )
  }
}