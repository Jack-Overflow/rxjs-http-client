import {HttpRequestConfig} from './http-request-config.class';

export class HttpConfigurations {
    public static httpConfigurationsDictionary: { [configName: string]: Partial<HttpRequestConfig> } = {
        POST: {
            headers: {
                'Content-Type': 'application/json',
            },
            body: {},
        },
        GET: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
        PUT: {
            headers: {
                'Content-Type': 'application/json',
            },
            body: {},
        },
        PATCH: {
            headers: {
                'Content-Type': 'application/json',
            },
            body: {},
        },
        DELETE: {
            headers: {
                'Content-Type': 'application/json',
            },
            body: {},
        },
    };
}
