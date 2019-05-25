import {RxjsHttpRequestConfig} from './http-request-config.class';

export class HttpConfigurations {
    public static httpConfigurationsDictionary: {[configName: string]: RxjsHttpRequestConfig} = {
        POST: {
            method: 'POST',
            referrer: 'no-referrer',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            mode: 'cors',
            cache: 'no-cache',
            requestObject: {},
        },
        GET: {
            method: 'GET',
            referrer: 'no-referrer',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            mode: 'cors',
            cache: 'no-cache',
        },
        PUT: {
            method: 'PUT',
            referrer: 'no-referrer',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            mode: 'cors',
            cache: 'no-cache',
            requestObject: {},
        },
        PATCH: {
            method: 'PATCH',
            referrer: 'no-referrer',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            mode: 'cors',
            cache: 'no-cache',
            requestObject: {}
        },
        DELETE: {
            method: 'DELETE',
            referrer: 'no-referrer',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            mode: 'cors',
            cache: 'no-cache',
            requestObject: {}
        }
    };
}
