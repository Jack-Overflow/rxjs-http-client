import {HttpInterceptors} from './http-interceptors.class';
import {IHttpInterceptor} from './http-interceptor.interface';
import {HttpRequest} from './http-request.class';
import {HttpResponse} from './http-response.class';

class MockRequestInterceptorOne implements IHttpInterceptor<HttpRequest> {
    public intercept(data: HttpRequest): HttpRequest {
        const request = data.clone();
        request.headers = {
            ...request.headers,
            'X-Authentication-Token': 'fake-auth-token'
        };

        return request;
    }
}

class MockRequestInterceptorTwo implements IHttpInterceptor<HttpRequest> {
    public intercept(data: HttpRequest): HttpRequest {
        const request = data.clone();
        request.headers = {
            ...request.headers,
            'X-Authentication-Token': 'overwritten-fake-auth-token'
        };

        return request;
    }
}

class MockResponseInterceptorOne implements IHttpInterceptor<HttpResponse> {
    public intercept(data: HttpResponse): HttpResponse {
        const response = data.clone();
        response.headers.set('mock-response-header', 'mock-response-header-value');
        return response;
    }
}

class MockResponseInterceptorTwo implements IHttpInterceptor<HttpResponse> {
    public intercept(data: HttpResponse): HttpResponse {
        const response = data.clone();
        response.status = 206;
        return response;
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
        it('Then the request is correctly modified', () => {
            const result = subject.execute(mockRequest);
            expect(result.headers['X-Authentication-Token']).toEqual('fake-auth-token');
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
        it('Then the request is correctly modified', () => {
            const result = subject.execute(mockRequest);
            expect(result.headers['X-Authentication-Token']).toEqual('overwritten-fake-auth-token');
        });
    });
});

describe('Given request with a single HTTP response interceptor', () => {
    const mockResponse: HttpResponse = new HttpResponse(
        new Response(JSON.stringify({
            response: 'mock-response'
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    );

    const subject = new HttpInterceptors([
        new MockResponseInterceptorOne()
    ]);

    describe('When executing the interceptors', () => {
        it('Then the response is correctly modified', () => {
            const result = subject.execute(mockResponse)
            expect(result.headers.get('mock-response-header')).toEqual('mock-response-header-value');
        });
    });
});

describe('Given request with multiple HTTP response interceptors', () => {
    const mockResponse: HttpResponse = new HttpResponse(
        new Response(JSON.stringify({
            response: 'mock-response'
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    );

    const subject = new HttpInterceptors([
        new MockResponseInterceptorOne(),
        new MockResponseInterceptorTwo()
    ]);

    describe('When executing the interceptors', () => {
        it('Then the response is correctly modified', () => {
            const result = subject.execute(mockResponse)
            expect(result.status).toEqual(206);
            expect(result.headers.get('mock-response-header')).toEqual('mock-response-header-value');
        });
    });
});
