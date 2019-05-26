import {RxjsHttpRequestConfig} from './http-request-config.class';

export class HttpConfigurations {
    public static httpConfigurationsDictionary: {[configName: string]: Partial<RxjsHttpRequestConfig>} = {
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
            requestBody: {},
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
            requestBody: {},
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
            requestBody: {},
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
            requestBody: {},
        },
    };
}
