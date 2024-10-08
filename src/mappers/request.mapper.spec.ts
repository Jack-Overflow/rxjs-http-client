import {RequestMapper} from './request.mapper';
import {HttpRequestConfigurations} from '../types/http-configurations.enum';
import {HttpRequest} from '../types/http-request.class';

describe('RequestMapper', () => {
    describe('Given a request to map a GET request with no body', () => {
        it('Then the request is correctly mapped with no body', () => {
            const request = new HttpRequest('https://example.com', {
                headers: {
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.GET)).toEqual({
                headers: {
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'GET',
                body: null
            });
        });
    });

    describe('Given a request to map a GET request with a JSON body', () => {
        it('Then the request is correctly mapped with no body', () => {
            const request = new HttpRequest('https://example.com', {
                body: {
                    'test-body': 'test-body-value'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.GET)).toEqual({
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'GET',
                body: null
            });
        });
    });

    describe('Given a request to map a GET request with a FormData body', () => {
        it('Then the request is correctly mapped with no body', () => {
            const formData = new FormData();
            formData.append('name', 'Test name');

            const request = new HttpRequest('https://example.com', {
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.GET)).toEqual({
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'GET',
                body: null
            });
        });
    });

    describe('Given a request to map a POST request with no body', () => {
        it('Then the request is correctly mapped with no body', () => {
            const request = new HttpRequest('https://example.com', {
                headers: {
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.POST)).toEqual({
                headers: {
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'POST',
                body: null
            });
        });
    });

    describe('Given a request to map a POST request with a JSON body', () => {
        it('Then the request is correctly mapped with a JSON body', () => {
            const request = new HttpRequest('https://example.com', {
                body: {
                    'test-body': 'test-body-value'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.POST)).toEqual({
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'POST',
                body: JSON.stringify({
                    'test-body': 'test-body-value'
                })
            });
        });
    });

    describe('Given a request to map a POST request with a FormData body', () => {
        it('Then the request is correctly mapped with a FormData body', () => {
            const formData = new FormData();
            formData.append('name', 'Test name');

            const request = new HttpRequest('https://example.com', {
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.POST)).toEqual({
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'POST',
                body: formData
            });
        });
    });

    describe('Given a request to map a PUT request with no body', () => {
        it('Then the request is correctly mapped with no body', () => {
            const request = new HttpRequest('https://example.com', {
                headers: {
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.PUT)).toEqual({
                headers: {
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'PUT',
                body: null
            });
        });
    });

    describe('Given a request to map a PUT request with a JSON body', () => {
        it('Then the request is correctly mapped with a JSON body', () => {
            const request = new HttpRequest('https://example.com', {
                body: {
                    'test-body': 'test-body-value'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.PUT)).toEqual({
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'PUT',
                body: JSON.stringify({
                    'test-body': 'test-body-value'
                })
            });
        });
    });

    describe('Given a request to map a PUT request with a FormData body', () => {
        it('Then the request is correctly mapped with a FormData body', () => {
            const formData = new FormData();
            formData.append('name', 'Test name');

            const request = new HttpRequest('https://example.com', {
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.PUT)).toEqual({
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'PUT',
                body: formData
            });
        });
    });

    describe('Given a request to map a PATCH request with no body', () => {
        it('Then the request is correctly mapped with no body', () => {
            const request = new HttpRequest('https://example.com', {
                headers: {
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.PATCH)).toEqual({
                headers: {
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'PATCH',
                body: null
            });
        });
    });

    describe('Given a request to map a PATCH request with a JSON body', () => {
        it('Then the request is correctly mapped with a JSON body', () => {
            const request = new HttpRequest('https://example.com', {
                body: {
                    'test-body': 'test-body-value'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.PATCH)).toEqual({
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'PATCH',
                body: JSON.stringify({
                    'test-body': 'test-body-value'
                })
            });
        });
    });

    describe('Given a request to map a PATCH request with a FormData body', () => {
        it('Then the request is correctly mapped with a FormData body', () => {
            const formData = new FormData();
            formData.append('name', 'Test name');

            const request = new HttpRequest('https://example.com', {
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.PATCH)).toEqual({
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'PATCH',
                body: formData
            });
        });
    });

    describe('Given a request to map a DELETE request with no body', () => {
        it('Then the request is correctly mapped with no body', () => {
            const request = new HttpRequest('https://example.com', {
                headers: {
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.DELETE)).toEqual({
                headers: {
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'DELETE',
                body: null
            });
        });
    });

    describe('Given a request to map a DELETE request with a JSON body', () => {
        it('Then the request is correctly mapped with a JSON body', () => {
            const request = new HttpRequest('https://example.com', {
                body: {
                    'test-body': 'test-body-value'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.DELETE)).toEqual({
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'DELETE',
                body: JSON.stringify({
                    'test-body': 'test-body-value'
                })
            });
        });
    });

    describe('Given a request to map a DELETE request with a FormData body', () => {
        it('Then the request is correctly mapped with a FormData body', () => {
            const formData = new FormData();
            formData.append('name', 'Test name');

            const request = new HttpRequest('https://example.com', {
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                referrer: 'test-referer',
            });

            expect(RequestMapper.for(request, HttpRequestConfigurations.DELETE)).toEqual({
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Authentication-Token': 'fake-auth-token'
                },
                referrer: 'test-referer',
                cache: 'default',
                mode: 'cors',
                credentials: 'same-origin',
                redirect: 'error',
                method: 'DELETE',
                body: formData
            });
        });
    });
});
