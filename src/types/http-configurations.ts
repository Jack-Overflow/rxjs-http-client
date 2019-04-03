import {HttpRequestConfig} from './http-request-config.class';

export class HttpConfigurations {
    public static httpConfigurationsDictionary: {[configName: string]: HttpRequestConfig} = {
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
    };
}
