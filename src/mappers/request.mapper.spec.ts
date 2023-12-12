import {RequestMapper} from './request.mapper';
import {HttpRequestConfigurations} from '../types/http-configurations.enum';
import {HttpRequest} from '../types/http-request.class';

describe('RequestMapper', () => {
   describe('Given a request to map a request', () => {
      it('Then the request is correctly mapped', () => {
          const request = new HttpRequest('https://example.com', {
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
          })
      });
   });
});
