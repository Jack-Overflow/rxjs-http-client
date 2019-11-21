import {HttpRequestConfigurationsEnum} from '../types/http-configurations.enum';
import {HttpConfigurations} from '../types/http-configurations';
import {HttpRequestConfig} from '../types/http-request-config.class';

export class RequestMapper {
    public static mapRequestInitFor(httpRequestConfig: Partial<HttpRequestConfig>, method: HttpRequestConfigurationsEnum): RequestInit {
        const defaultConfig = HttpConfigurations.httpConfigurationsDictionary[method];

        return {
            cache: httpRequestConfig.cache || defaultConfig.cache,
            mode: httpRequestConfig.mode || defaultConfig.mode,
            credentials: httpRequestConfig.credentials || defaultConfig.credentials,
            headers: httpRequestConfig.headers || defaultConfig.headers,
            redirect: httpRequestConfig.redirect || defaultConfig.redirect,
            referrer: httpRequestConfig.referrer || defaultConfig.referrer,
            method: method,
            body: httpRequestConfig.body ? JSON.stringify(httpRequestConfig.body) : JSON.stringify(defaultConfig.body),
        };
    }
}

