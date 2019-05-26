import {RxjsHttpRequestConfig} from '../types/http-request-config.class';
import {HttpRequestConfigurationsEnum} from '../types/http-configurations.enum';
import {HttpConfigurations} from '../types/http-configurations';

export class RequestMapper {
    public static mapRequestInitFor(httpRequestConfig: Partial<RxjsHttpRequestConfig>, configType: HttpRequestConfigurationsEnum): RequestInit {
        const defaultConfig = HttpConfigurations.httpConfigurationsDictionary[configType];

        return {
            cache: defaultConfig.cache,
            mode: defaultConfig.mode,
            credentials: defaultConfig.credentials,
            headers: {
                ...defaultConfig.headers,
                ...httpRequestConfig.headers,
            } as HeadersInit,
            redirect: defaultConfig.redirect,
            referrer: defaultConfig.referrer,
            method: defaultConfig.method,
            body: defaultConfig.requestBody,
            ...httpRequestConfig,
        };
    }
}

