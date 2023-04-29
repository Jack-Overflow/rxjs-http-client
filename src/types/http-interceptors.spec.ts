import {HttpInterceptors} from './http-interceptors.class';
import {IHttpInterceptor} from './http-interceptor.interface';
import {HttpRequest} from './http-request.class';
import {map, mergeMap, Observable, of} from 'rxjs';
import {HttpResponse} from './http-response.class';

class MockRequestInterceptorOne implements IHttpInterceptor<HttpRequest> {
    public intercept(data: HttpRequest): Observable<HttpRequest> {
        const request = data.clone();
        request.headers = {
            ...request.headers,
            'X-Authentication-Token': 'fake-auth-token'
        };

        return of(request);
    }
}

class MockRequestInterceptorTwo implements IHttpInterceptor<HttpRequest> {
    public intercept(data: HttpRequest): Observable<HttpRequest> {
        const request = data.clone();
        request.headers = {
            ...request.headers,
            'X-Authentication-Token': 'overwritten-fake-auth-token'
        };

        return of(request);
    }
}

class MockResponseInterceptorOne implements IHttpInterceptor<HttpResponse> {
    public intercept(data: HttpResponse): Observable<HttpResponse> {
        return of(data.clone())
            .pipe(
                mergeMap((response) => response.json()),
                map((json) => ({
                    ...json,
                    interceptorValue: 'mock-response-interceptor'
                })),
                map((json) => {
                    return new HttpResponse(json, {
                        headers: data.headers,
                        status: data.status,
                        statusText: data.statusText
                    });
                })
            );
    }
}

class MockResponseInterceptorTwo implements IHttpInterceptor<HttpResponse> {
    public intercept(data: HttpResponse): Observable<HttpResponse> {
        return of(data.clone())
            .pipe(
                mergeMap((response) => response.json()),
                map((json) => ({
                    ...json,
                    interceptorValue: 'overwritten-mock-response-interceptor'
                })),
                map((json) => {
                    return new HttpResponse(json, {
                        headers: data.headers,
                        status: data.status,
                        statusText: data.statusText
                    });
                })
            );
    }
}

describe('Given request with a single HTTP request interceptor', () => {
    const mockRequest: HttpRequest = new HttpRequest('https://example.com', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const subject = new HttpInterceptors([
        new MockRequestInterceptorOne()
    ]);

    describe('When executing the interceptors', () => {
        it('Then the request is correctly modified', (done) => {
            subject.execute(mockRequest)
                .subscribe({
                    next: (result): void => {
                        expect(result.headers['X-Authentication-Token']).toEqual('fake-auth-token');
                        done();
                    }
                });
        });
    });
});

describe('Given request with multiple HTTP request interceptors', () => {
    const mockRequest: HttpRequest = new HttpRequest('https://example.com', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const subject = new HttpInterceptors([
        new MockRequestInterceptorOne(),
        new MockRequestInterceptorTwo()
    ]);

    describe('When executing the interceptors', () => {
        it('Then the request is correctly modified', (done) => {
            subject.execute(mockRequest)
                .subscribe({
                    next: (result): void => {
                        expect(result.headers['X-Authentication-Token']).toEqual('overwritten-fake-auth-token');
                        done();
                    }
                });
        });
    });
});

describe('Given request with a single HTTP response interceptor', () => {
    const mockResponse: HttpResponse = new HttpResponse(
        JSON.stringify({
            response: 'mock-response'
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    const subject = new HttpInterceptors([
        new MockResponseInterceptorOne()
    ]);

    describe('When executing the interceptors', () => {
        it('Then the response is correctly modified', (done) => {
            subject.execute(mockResponse)
                .pipe(
                    mergeMap((response) => response.json())
                )
                .subscribe({
                    next: (result): void => {
                        expect(result.response).toEqual('mock-response');
                        expect(result.interceptorValue).toEqual('mock-response-interceptor');
                        done();
                    }
                });
        });
    });
});

describe('Given request with multiple HTTP response interceptors', () => {
    const mockResponse: HttpResponse = new HttpResponse(
        JSON.stringify({
            response: 'mock-response'
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    const subject = new HttpInterceptors([
        new MockResponseInterceptorOne(),
        new MockResponseInterceptorTwo()
    ]);

    describe('When executing the interceptors', () => {
        it('Then the response is correctly modified', (done) => {
            subject.execute(mockResponse)
                .pipe(
                    mergeMap((response) => response.json())
                )
                .subscribe({
                    next: (result): void => {
                        expect(result.response).toEqual('mock-response');
                        expect(result.interceptorValue).toEqual('overwritten-mock-response-interceptor');
                        done();
                    }
                });
        });
    });
});
