import {of} from 'rxjs';
import {HttpResponse} from '../types/http-response.class';
import {throwIfNot200Response} from './throw-if-not-200-response.operator';

describe('throwIfNot200Response', () => {
    describe('Given response with a 200 status code', () => {
        it('Then the response is returned', (done) => {
            of(new HttpResponse(new Response('response', {status: 200})))
                .pipe(
                    throwIfNot200Response()
                )
                .subscribe({
                    next: (response) => {
                        expect(response.status).toEqual(200);
                        done();
                    }
                })
        });
    });

    describe('Given response with a non 200 status code', () => {
        it('Then the response error is thrown', (done) => {
            of(new HttpResponse(new Response('response', {status: 404})))
                .pipe(
                    throwIfNot200Response()
                )
                .subscribe({
                    error: (response) => {
                        expect(response.status).toEqual(404);
                        done();
                    }
                })
        });
    });
});
