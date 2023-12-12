import {RxJSHttpClient} from './rxjs-http-client';
import {forkJoin, from, mergeMap, of} from 'rxjs';
import {HttpRequestConfig} from './types/http-request-config.class';
import {HttpResponse} from './types/http-response.class';

describe('RxJSHttpClient', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Given a GET request', () => {
        const subject = new RxJSHttpClient();

        describe('When the HTTP request is executed', () => {
            beforeEach(() => {
                jest.spyOn(global, 'fetch').mockReturnValueOnce(
                    Promise.resolve(
                        new Response(
                            JSON.stringify({}), {
                                headers: {},
                                status: 200,
                                statusText: 'success'
                            })
                    )
                );
            });

            it('Then the fetch method is invoked with the correct request parameters', (done) => {
                const url = 'http://example.com';
                const request: Partial<HttpRequestConfig> = {
                    headers: {
                        'X-Authentication-Token': 'fake-auth-token'
                    },
                    cache: 'default',
                    mode: 'cors',
                    credentials: 'same-origin',
                    redirect: 'error',
                    referrer: 'test-referer'
                };

                subject.get(url, request)
                    .subscribe({
                        next: () => {
                            expect(global.fetch).toHaveBeenCalledWith(url, {
                                headers: {
                                    ...request.headers,
                                    'Content-Type': 'application/json',
                                },
                                referrer: request.referrer,
                                cache: request.cache,
                                mode: request.mode,
                                credentials: request.credentials,
                                redirect: request.redirect,
                                method: 'GET',
                                body: null
                            } as RequestInit);
                            done();
                        }
                    });
            });
        });

        describe('When the HTTP response is JSON', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                const json: object = {response: 'test'};

                beforeEach(() => {
                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                JSON.stringify(json), {
                                    headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                    },
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as JSON', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.json())
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(json);
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is FormData', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let formData: FormData;

                beforeEach(() => {
                    formData = new FormData();
                    formData.set('test', 'testing form data');

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                formData, {
                                    headers: {},
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toContain('multipart/form-data');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as FormData', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.formData())
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(formData);
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is a Blob', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let blob: Blob;

                beforeEach(() => {
                    blob = new Blob(['testing blob'], {
                        type: 'application/octet-stream'
                    });

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                blob, {
                                    headers: {
                                        'Content-Type': 'application/octet-stream'
                                    },
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('application/octet-stream');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as Blob', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.blob()),
                            mergeMap((blob: Blob) => forkJoin([
                                of(blob),
                                from(blob.text())
                            ]))
                        )
                        .subscribe(([response, blobAsText]) => {
                            expect(response).toEqual(blob);
                            expect(blobAsText).toEqual('testing blob');
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is Text', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let text: string;

                beforeEach(() => {
                    text = 'testing text';

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                text, {
                                    headers: {},
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('text/plain;charset=UTF-8');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as Text', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.text()),
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(text);
                            done();
                        });
                });
            });
        });
    });

    describe('Given a POST request', () => {
        const subject = new RxJSHttpClient();

        describe('When the HTTP request is executed', () => {
            beforeEach(() => {
                jest.spyOn(global, 'fetch').mockReturnValueOnce(
                    Promise.resolve(
                        new Response(
                            JSON.stringify({}), {
                                headers: {},
                                status: 200,
                                statusText: 'success'
                            })
                    )
                );
            });

            it('Then the fetch method is invoked with the correct request parameters', (done) => {
                const url = 'http://example.com';
                const request: Partial<HttpRequestConfig> = {
                    body: {
                        'test-body': 'test-body-value'
                    },
                    headers: {
                        'X-Authentication-Token': 'fake-auth-token'
                    },
                    cache: 'default',
                    mode: 'cors',
                    credentials: 'same-origin',
                    redirect: 'error',
                    referrer: 'test-referer'
                };

                subject.post(url, request)
                    .subscribe({
                        next: () => {
                            expect(global.fetch).toHaveBeenCalledWith(url, {
                                headers: {
                                    ...request.headers,
                                    'Content-Type': 'application/json',
                                },
                                referrer: request.referrer,
                                cache: request.cache,
                                mode: request.mode,
                                credentials: request.credentials,
                                redirect: request.redirect,
                                method: 'POST',
                                body: JSON.stringify({
                                    'test-body': 'test-body-value'
                                })
                            } as RequestInit);
                            done();
                        }
                    });
            });
        });

        describe('When the HTTP response is JSON', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                const json: object = {response: 'test'};

                beforeEach(() => {
                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                JSON.stringify(json), {
                                    headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                    },
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as JSON', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.json())
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(json);
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is FormData', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let formData: FormData;

                beforeEach(() => {
                    formData = new FormData();
                    formData.set('test', 'testing form data');

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                formData, {
                                    headers: {},
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toContain('multipart/form-data');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as FormData', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.formData())
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(formData);
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is a Blob', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let blob: Blob;

                beforeEach(() => {
                    blob = new Blob(['testing blob'], {
                        type: 'application/octet-stream'
                    });

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                blob, {
                                    headers: {
                                        'Content-Type': 'application/octet-stream'
                                    },
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('application/octet-stream');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as Blob', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.blob()),
                            mergeMap((blob: Blob) => forkJoin([
                                of(blob),
                                from(blob.text())
                            ]))
                        )
                        .subscribe(([response, blobAsText]) => {
                            expect(response).toEqual(blob);
                            expect(blobAsText).toEqual('testing blob');
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is Text', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let text: string;

                beforeEach(() => {
                    text = 'testing text';

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                text, {
                                    headers: {},
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('text/plain;charset=UTF-8');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as Text', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.text()),
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(text);
                            done();
                        });
                });
            });
        });
    });

    describe('Given a PUT request', () => {
        const subject = new RxJSHttpClient();

        describe('When the HTTP request is executed', () => {
            beforeEach(() => {
                jest.spyOn(global, 'fetch').mockReturnValueOnce(
                    Promise.resolve(
                        new Response(
                            JSON.stringify({}), {
                                headers: {},
                                status: 200,
                                statusText: 'success'
                            })
                    )
                );
            });

            it('Then the fetch method is invoked with the correct request parameters', (done) => {
                const url = 'http://example.com';
                const request: Partial<HttpRequestConfig> = {
                    body: {
                        'test-body': 'test-body-value'
                    },
                    headers: {
                        'X-Authentication-Token': 'fake-auth-token'
                    },
                    cache: 'default',
                    mode: 'cors',
                    credentials: 'same-origin',
                    redirect: 'error',
                    referrer: 'test-referer'
                };

                subject.put(url, request)
                    .subscribe({
                        next: () => {
                            expect(global.fetch).toHaveBeenCalledWith(url, {
                                headers: {
                                    ...request.headers,
                                    'Content-Type': 'application/json',
                                },
                                referrer: request.referrer,
                                cache: request.cache,
                                mode: request.mode,
                                credentials: request.credentials,
                                redirect: request.redirect,
                                method: 'PUT',
                                body: JSON.stringify({
                                    'test-body': 'test-body-value'
                                })
                            } as RequestInit);
                            done();
                        }
                    });
            });
        });

        describe('When the HTTP response is JSON', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                const json: object = {response: 'test'};

                beforeEach(() => {
                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                JSON.stringify(json), {
                                    headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                    },
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as JSON', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.json())
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(json);
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is FormData', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let formData: FormData;

                beforeEach(() => {
                    formData = new FormData();
                    formData.set('test', 'testing form data');

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                formData, {
                                    headers: {},
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toContain('multipart/form-data');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as FormData', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.formData())
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(formData);
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is a Blob', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let blob: Blob;

                beforeEach(() => {
                    blob = new Blob(['testing blob'], {
                        type: 'application/octet-stream'
                    });

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                blob, {
                                    headers: {
                                        'Content-Type': 'application/octet-stream'
                                    },
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('application/octet-stream');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as Blob', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.blob()),
                            mergeMap((blob: Blob) => forkJoin([
                                of(blob),
                                from(blob.text())
                            ]))
                        )
                        .subscribe(([response, blobAsText]) => {
                            expect(response).toEqual(blob);
                            expect(blobAsText).toEqual('testing blob');
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is Text', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let text: string;

                beforeEach(() => {
                    text = 'testing text';

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                text, {
                                    headers: {},
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('text/plain;charset=UTF-8');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as Text', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.text()),
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(text);
                            done();
                        });
                });
            });
        });
    });

    describe('Given a PATCH request', () => {
        const subject = new RxJSHttpClient();

        describe('When the HTTP request is executed', () => {
            beforeEach(() => {
                jest.spyOn(global, 'fetch').mockReturnValueOnce(
                    Promise.resolve(
                        new Response(
                            JSON.stringify({}), {
                                headers: {},
                                status: 200,
                                statusText: 'success'
                            })
                    )
                );
            });

            it('Then the fetch method is invoked with the correct request parameters', (done) => {
                const url = 'http://example.com';
                const request: Partial<HttpRequestConfig> = {
                    body: {
                        'test-body': 'test-body-value'
                    },
                    headers: {
                        'X-Authentication-Token': 'fake-auth-token'
                    },
                    cache: 'default',
                    mode: 'cors',
                    credentials: 'same-origin',
                    redirect: 'error',
                    referrer: 'test-referer'
                };

                subject.patch(url, request)
                    .subscribe({
                        next: () => {
                            expect(global.fetch).toHaveBeenCalledWith(url, {
                                headers: {
                                    ...request.headers,
                                    'Content-Type': 'application/json',
                                },
                                referrer: request.referrer,
                                cache: request.cache,
                                mode: request.mode,
                                credentials: request.credentials,
                                redirect: request.redirect,
                                method: 'PATCH',
                                body: JSON.stringify({
                                    'test-body': 'test-body-value'
                                })
                            } as RequestInit);
                            done();
                        }
                    });
            });
        });

        describe('When the HTTP response is JSON', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                const json: object = {response: 'test'};

                beforeEach(() => {
                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                JSON.stringify(json), {
                                    headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                    },
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as JSON', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.json())
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(json);
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is FormData', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let formData: FormData;

                beforeEach(() => {
                    formData = new FormData();
                    formData.set('test', 'testing form data');

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                formData, {
                                    headers: {},
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toContain('multipart/form-data');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as FormData', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.formData())
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(formData);
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is a Blob', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let blob: Blob;

                beforeEach(() => {
                    blob = new Blob(['testing blob'], {
                        type: 'application/octet-stream'
                    });

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                blob, {
                                    headers: {
                                        'Content-Type': 'application/octet-stream'
                                    },
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('application/octet-stream');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as Blob', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.blob()),
                            mergeMap((blob: Blob) => forkJoin([
                                of(blob),
                                from(blob.text())
                            ]))
                        )
                        .subscribe(([response, blobAsText]) => {
                            expect(response).toEqual(blob);
                            expect(blobAsText).toEqual('testing blob');
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is Text', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let text: string;

                beforeEach(() => {
                    text = 'testing text';

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                text, {
                                    headers: {},
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('text/plain;charset=UTF-8');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as Text', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.text()),
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(text);
                            done();
                        });
                });
            });
        });
    });

    describe('Given a DELETE request', () => {
        const subject = new RxJSHttpClient();

        describe('When the HTTP request is executed', () => {
            beforeEach(() => {
                jest.spyOn(global, 'fetch').mockReturnValueOnce(
                    Promise.resolve(
                        new Response(
                            JSON.stringify({}), {
                                headers: {},
                                status: 200,
                                statusText: 'success'
                            })
                    )
                );
            });

            it('Then the fetch method is invoked with the correct request parameters', (done) => {
                const url = 'http://example.com';
                const request: Partial<HttpRequestConfig> = {
                    body: {
                        'test-body': 'test-body-value'
                    },
                    headers: {
                        'X-Authentication-Token': 'fake-auth-token'
                    },
                    cache: 'default',
                    mode: 'cors',
                    credentials: 'same-origin',
                    redirect: 'error',
                    referrer: 'test-referer'
                };

                subject.delete(url, request)
                    .subscribe({
                        next: () => {
                            expect(global.fetch).toHaveBeenCalledWith(url, {
                                headers: {
                                    ...request.headers,
                                    'Content-Type': 'application/json',
                                },
                                referrer: request.referrer,
                                cache: request.cache,
                                mode: request.mode,
                                credentials: request.credentials,
                                redirect: request.redirect,
                                method: 'DELETE',
                                body: JSON.stringify({
                                    'test-body': 'test-body-value'
                                })
                            } as RequestInit);
                            done();
                        }
                    });
            });
        });

        describe('When the HTTP response is JSON', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                const json: object = {response: 'test'};

                beforeEach(() => {
                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                JSON.stringify(json), {
                                    headers: {
                                        'Content-Type': 'application/json; charset=utf-8'
                                    },
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as JSON', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.json())
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(json);
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is FormData', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let formData: FormData;

                beforeEach(() => {
                    formData = new FormData();
                    formData.set('test', 'testing form data');

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                formData, {
                                    headers: {},
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toContain('multipart/form-data');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as FormData', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.formData())
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(formData);
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is a Blob', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let blob: Blob;

                beforeEach(() => {
                    blob = new Blob(['testing blob'], {
                        type: 'application/octet-stream'
                    });

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                blob, {
                                    headers: {
                                        'Content-Type': 'application/octet-stream'
                                    },
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('application/octet-stream');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as Blob', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.blob()),
                            mergeMap((blob: Blob) => forkJoin([
                                of(blob),
                                from(blob.text())
                            ]))
                        )
                        .subscribe(([response, blobAsText]) => {
                            expect(response).toEqual(blob);
                            expect(blobAsText).toEqual('testing blob');
                            done();
                        });
                });
            });
        });

        describe('When the HTTP response is Text', () => {
            describe('And the HTTP status code is 200 (successful)', () => {
                let text: string;

                beforeEach(() => {
                    text = 'testing text';

                    jest.spyOn(global, 'fetch').mockReturnValueOnce(
                        Promise.resolve(
                            new Response(
                                text, {
                                    headers: {},
                                    status: 200,
                                    statusText: 'success'
                                })
                        )
                    );
                });

                it('Then the response is a HttpResponse object', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response).toBeInstanceOf(HttpResponse);
                                done();
                            }
                        });
                });

                it('Then the response headers are correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.headers.get('Content-Type')).toEqual('text/plain;charset=UTF-8');
                                done();
                            }
                        });
                });

                it('Then the response status code is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.status).toEqual(200);
                                done();
                            }
                        });
                });

                it('Then the response status text is correct', (done) => {
                    subject.get('http://example.com')
                        .subscribe({
                            next: (response) => {
                                expect(response.statusText).toEqual('success');
                                done();
                            }
                        });
                });

                it('Then the response body can be retrieved as Text', (done) => {
                    subject.get('http://example.com')
                        .pipe(
                            mergeMap((response) => response.text()),
                        )
                        .subscribe((response) => {
                            expect(response).toEqual(text);
                            done();
                        });
                });
            });
        });
    });
});
