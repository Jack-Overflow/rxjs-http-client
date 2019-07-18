import {RxjsHttpRequestConfig} from '../types/http-request-config.class';
import {HttpRequestConfigurationsEnum} from '../types/http-configurations.enum';
import {HttpConfigurations} from '../types/http-configurations';

export class RequestMapper {
    public static mapRequestInitFor(httpRequestConfig: Partial<RxjsHttpRequestConfig>, configType: HttpRequestConfigurationsEnum): RequestInit {
        const defaultConfig = HttpConfigurations.httpConfigurationsDictionary[configType];

        return {
            cache: httpRequestConfig.cache || defaultConfig.cache,
            mode: httpRequestConfig.mode || defaultConfig.mode,
            credentials: httpRequestConfig.credentials || defaultConfig.credentials,
            headers: httpRequestConfig.headers || defaultConfig.headers,
            redirect: httpRequestConfig.redirect || defaultConfig.redirect,
            referrer: httpRequestConfig.referrer || defaultConfig.referrer,
            method: httpRequestConfig.method || defaultConfig.method,
            body: httpRequestConfig.body || defaultConfig.body,
        };
    }
}

